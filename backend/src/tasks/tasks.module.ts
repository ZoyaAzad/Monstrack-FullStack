import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './entities/task.entity';
import { User } from '../users/user.entity/user.entity';
import { XpModule } from '../xp/xp.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, User]),
    XpModule,
  ],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TasksService],
  
})
export class TasksModule {}
