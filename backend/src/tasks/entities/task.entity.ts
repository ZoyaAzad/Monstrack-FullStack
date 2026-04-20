import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/user.entity/user.entity';

@Entity('task')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: false })
  completed: boolean;

  @Column({ default: 'todo' })
  type: string; // 'habit' | 'daily' | 'todo'

  @Column({ name: 'xpReward', default: 10 })
  xpReward: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;
}
