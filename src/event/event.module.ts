import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScreenRepository } from 'src/screen/screen.repository';
import { UserRepository } from 'src/user/user.repository';
import { EventController } from './event.controller';
import { EventRepository } from './event.repository';
import { EventService } from './event.service';

@Module({
  imports: [TypeOrmModule.forFeature([EventRepository, UserRepository, ScreenRepository])],
  controllers: [EventController],
  providers: [EventService]
})
export class EventModule {}
