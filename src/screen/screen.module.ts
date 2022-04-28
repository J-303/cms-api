import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScreenController } from './screen.controller';
import { ScreenService } from './screen.service';
import { ScreenRepository } from './screen.repository';
import { UserRepository } from 'src/user/user.repository';
import { EventRepository } from 'src/event/event.repository';
import { PlaylistRepository } from 'src/playlist/playlist.repository';

@Module({
    imports: [TypeOrmModule.forFeature([ScreenRepository, UserRepository, EventRepository, PlaylistRepository])],
    controllers: [ScreenController],
    providers: [ScreenService]
})
export class ScreenModule {}
