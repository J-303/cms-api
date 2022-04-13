import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from 'src/event/event.entity';
import { PlaylistEntity } from 'src/playlist/playlist.entity';
import { UserEntity } from 'src/user/user.entity';
import { ScreenEntity } from './screen.entity';
import { ScreenController } from './screen.controller';
import { ScreenService } from './screen.service';

@Module({
    imports: [TypeOrmModule.forFeature([ScreenEntity, UserEntity, EventEntity, PlaylistEntity])],
    controllers: [ScreenController],
    providers: [ScreenService]
})
export class ScreenModule {}
