import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  googleId: string;

  @Column({ default: 0 })
  xp: number;

  @Column({ default: 1 })
  level: number;

  @Column({ type: 'float', default: 0 })
  averageScore: number;

  @Column({ default: 0 })
  quizzesTaken: number;

  @Column({ type: 'jsonb', nullable: true, default: [] })
  history: { date: string; xp: number; score: number }[];
}
