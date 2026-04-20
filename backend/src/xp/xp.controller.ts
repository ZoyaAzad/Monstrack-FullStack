import { Controller, Patch, Param, Body } from '@nestjs/common';
import { XpService } from './xp.service';

@Controller('xp')
export class XpController {
  constructor(private readonly xpService: XpService) {}

  @Patch(':id/add')
addXp(
  @Param('id') id: string,
  @Body('xp') xp: number,
) {
  return this.xpService.addXp(Number(id), xp);
}

}
