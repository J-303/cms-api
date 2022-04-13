import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentPlaylistEntity } from 'src/content-playlist/content-playlist.entity';
import { UserEntity } from 'src/user/user.entity';
import { PlaylistController } from './playlist.controller';
import { PlaylistEntity } from './playlist.entity';
import { PlaylistService } from './playlist.service';

@Module({
    imports: [TypeOrmModule.forFeature([PlaylistEntity, UserEntity, ContentPlaylistEntity])],
    controllers: [PlaylistController],
    providers: [PlaylistService]
})
export class PlaylistModule {}
