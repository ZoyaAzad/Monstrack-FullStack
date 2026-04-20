import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { XpService } from './xp.service';
import { XpController } from './xp.controller';
import { User } from '../users/user.entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [XpController],
  providers: [XpService],
  exports:[XpService],
})
export class XpModule {}
