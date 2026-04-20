import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity/user.entity';

@Injectable()
export class XpService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  // Core rule: every 100 XP = +1 level
  private calculateLevel(xp: number): number {
    return Math.floor(xp / 100) + 1;
  }

  async addXp(userId: number, xpToAdd: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.xp = Math.max(0, user.xp + xpToAdd);
    user.level = this.calculateLevel(user.xp);

    await this.userRepository.save(user);

    return {
      id: user.id,
      email: user.email,
      xp: user.xp,
      level: user.level,
    };
  }
}
