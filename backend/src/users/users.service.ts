import { Injectable } from '@nestjs/common';
import { UnauthorizedException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Inject } from '@nestjs/common';
import { User } from './user.entity/user.entity';
import { TasksService } from '../tasks/tasks.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
    @Inject(DataSource) private dataSource: DataSource,
    private readonly tasksService: TasksService,
  ) { }

  async createUser(email: string, password: string) {
    const existingUser = await this.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = this.usersRepo.create({
        email,
        password: hashedPassword,
        xp: 0,
        level: 1,
      });

      // Save user ONCE
      const savedUser = await this.usersRepo.save(user);

      // Create default tasks ONCE
      const defaultTasks = [
        { title: 'Complete profile', xp: 20, type: 'habit' },
        { title: 'Finish first task', xp: 40, type: 'daily' },
        { title: 'Explore the dashboard', xp: 10, type: 'todo' },
      ];

      for (const task of defaultTasks) {
        await this.tasksService.create(savedUser.id, {
          title: task.title,
          xp: task.xp,
          type: task.type,
        });
      }

      //Return the saved user
      return savedUser;
    } catch (error) {
      console.error('Error creating user DETAILED:', error);
      // LOG TO FILE
      try {
        const fs = require('fs');
        const path = require('path');
        const logPath = path.join(process.cwd(), 'backend_error.log');
        fs.appendFileSync(logPath, `\n[${new Date().toISOString()}] Signup Error: ${JSON.stringify(error, Object.getOwnPropertyNames(error))}\n`);
      } catch (fsErr) { console.error('FS Error', fsErr); }

      throw new InternalServerErrorException(`Signup Failed: ${error.message}`);
    }
  }

  async findByEmail(email: string) {
    return this.usersRepo.findOne({
      where: { email },
    });
  }

  async loginUser(email: string, password: string) {
    const user = await this.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      message: 'Login successful',
      userId: user.id,
      email: user.email,
      level: user.level,
      xp: user.xp,
      name: user.name,
      averageScore: user.averageScore,
      quizzesTaken: user.quizzesTaken,
      history: user.history || [],
    };
  }

  async testConnection() {
    try {
      // Try raw query using DataSource (most basic check possible)
      const result = await this.dataSource.query('SELECT 1 as ping');
      return { status: 'OK', ping: result[0]?.ping, message: 'Database connected successfully via DataSource' };
    } catch (e) {
      console.error('DB TEST FAILED:', e);
      return {
        status: 'ERROR',
        message: e.message,
        sqlMessage: e.sqlMessage || 'N/A',
      };
    }
  }

  async updateUser(userId: number, updateData: {
    name?: string;
    email?: string;
    xp?: number;
    level?: number;
    averageScore?: number;
    quizzesTaken?: number;
    history?: { date: string; xp: number; score: number }[];
  }) {
    const user = await this.usersRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (updateData.name) user.name = updateData.name;
    if (updateData.email) user.email = updateData.email;
    if (updateData.xp !== undefined) user.xp = updateData.xp;
    if (updateData.level !== undefined) user.level = updateData.level;
    if (updateData.averageScore !== undefined) user.averageScore = updateData.averageScore;
    if (updateData.quizzesTaken !== undefined) user.quizzesTaken = updateData.quizzesTaken;
    if (updateData.history !== undefined) user.history = updateData.history;

    return this.usersRepo.save(user);
  }
  async googleLogin(token: string) {
    // Verify Access Token via UserInfo Endpoint
    let googleUser;
    try {
      const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Failed to fetch user info');
      googleUser = await response.json();
    } catch (error) {
      throw new UnauthorizedException('Invalid Google Token');
    }

    const { sub: googleId, email, name, picture } = googleUser;

    if (!email) throw new BadRequestException('Google account must have an email');

    // 1. Try to find by Google ID
    let user = await this.usersRepo.findOne({ where: { googleId } });

    // 2. If not found by Google ID, try by email
    // If found by email, link the accounts (update googleId)
    if (!user) {
      user = await this.usersRepo.findOne({ where: { email } });
      if (user) {
        user.googleId = googleId;
        await this.usersRepo.save(user);
      }
    }

    // 3. If still not found, create new user
    if (!user) {
      user = this.usersRepo.create({
        email,
        name: name || 'Monster Hunter',
        password: '', // No password for Google users
        googleId,
        xp: 0,
        level: 1,
      });
      user = await this.usersRepo.save(user);

      // Create default tasks for new Google user
      const defaultTasks = [
        { title: 'Complete profile', xp: 20, type: 'habit' },
        { title: 'Finish first task', xp: 40, type: 'daily' },
        { title: 'Explore the dashboard', xp: 10, type: 'todo' },
      ];
      for (const task of defaultTasks) {
        // Warning: tasksService.create might expect a non-null user or id. 
        // Our tasksService.create uses userId (number), so this is fine.
        await this.tasksService.create(user.id, {
          title: task.title,
          xp: task.xp,
          type: task.type,
        });
      }
    }

    return {
      message: 'Google Login successful',
      userId: user.id,
      email: user.email,
      level: user.level,
      xp: user.xp,
      name: user.name,
      averageScore: user.averageScore,
      quizzesTaken: user.quizzesTaken,
      history: user.history || [],
    };
  }
}
