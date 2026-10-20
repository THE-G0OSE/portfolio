import { Body, Controller, Put } from '@nestjs/common';
import { AdminWrite } from '../common/admin-write.decorator';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Put()
  @AdminWrite()
  update(@Body() dto: UpdateProfileDto) {
    return this.profileService.update(dto);
  }
}
