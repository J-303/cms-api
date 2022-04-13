import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScreenEntity } from 'src/screen/screen.entity';
import { UserEntity } from 'src/user/user.entity';
import { EventController } from './event.controller';
import { EventEntity } from './event.entity';
import { EventService } from './event.service';

@Module({
  imports: [TypeOrmModule.forFeature([EventEntity, UserEntity, ScreenEntity])],
  controllers: [EventController],
  providers: [EventService]
})
export class EventModule {}
