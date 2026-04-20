import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { User } from '../users/user.entity/user.entity';
import { XpService } from '../xp/xp.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepo: Repository<Task>,

    @InjectRepository(User)
    private userRepo: Repository<User>,

    private xpService: XpService,
  ) { }

  async create(userId: number, dto: CreateTaskDto) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const task = this.taskRepo.create({
      title: dto.title,
      description: dto.domain ?? '',
      xpReward: dto.xp,
      type: dto.type ?? 'todo',
      user,
    });

    return this.taskRepo.save(task);
  }

  async findAll(userId: number) {
    return this.taskRepo.find({
      where: { user: { id: userId } },
      order: { id: 'ASC' }
    });
  }

  async update(id: number, dto: UpdateTaskDto) {

    const task = await this.taskRepo.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!task) throw new NotFoundException('Task not found');
    // ❌ Prevent XP edits on completed tasks
    if (task.completed && dto.xp !== undefined && dto.xp !== task.xpReward) {
      throw new BadRequestException(
        'Cannot change XP of a completed task'
      );
    }


    const wasCompleted = task.completed;

    // Update task state first
    if (dto.title !== undefined) task.title = dto.title;
    if (dto.domain !== undefined) task.description = dto.domain;
    if (dto.xp !== undefined) task.xpReward = dto.xp;
    if (dto.completed !== undefined) task.completed = dto.completed;

    const savedTask = await this.taskRepo.save(task);

    let updatedUser: {
      id: number;
      email: string;
      xp: number;
      level: number;
    } | null = null;

    // Award XP ONLY on first completion
    // XP logic based on state transition
    if (!wasCompleted && savedTask.completed) {
      // checked → reward XP
      updatedUser = await this.xpService.addXp(
        savedTask.user.id,
        savedTask.xpReward,
      );

    }
    if (wasCompleted && !savedTask.completed) {
      // unchecked → remove XP
      updatedUser = await this.xpService.addXp(
        savedTask.user.id,
        -savedTask.xpReward,
      );
    }

    return {
      task: savedTask,
      user: updatedUser,
    };
  }


  async remove(id: number) {
    const task = await this.taskRepo.findOne({ where: { id } });
    if (!task) throw new NotFoundException('Task not found');

    return this.taskRepo.remove(task);
  }
}
