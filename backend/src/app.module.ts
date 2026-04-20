import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './users/user.entity/user.entity';
import { UsersModule } from './users/users.module';
import { XpModule } from './xp/xp.module';
import { TasksModule } from './tasks/tasks.module';
import { Task } from './tasks/entities/task.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const dbUrl = config.get('DATABASE_URL');
        return {
          type: 'postgres',
          url: dbUrl,
          host: !dbUrl ? config.get('DB_HOST') || 'localhost' : undefined,
          port: !dbUrl ? Number(config.get('DB_PORT')) || 5432 : undefined,
          username: !dbUrl ? config.get('DB_USERNAME') || 'postgres' : undefined,
          password: !dbUrl ? config.get('DB_PASSWORD') || 'pass4536' : undefined,
          database: !dbUrl ? config.get('DB_NAME') || 'postgres' : undefined,
          entities: [User, Task],
          synchronize: true,
          autoLoadEntities: true,
          ssl: dbUrl ? { rejectUnauthorized: false } : false,
        };
      },
    }),

    UsersModule,
    XpModule,
    TasksModule,
  ],
})
export class AppModule { }
