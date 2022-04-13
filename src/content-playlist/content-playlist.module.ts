import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentEntity } from 'src/content/content.entity';
import { PlaylistEntity } from 'src/playlist/playlist.entity';
import { UserEntity } from 'src/user/user.entity';
import { ContentPlaylistController } from './content-playlist.controller';
import { ContentPlaylistEntity } from './content-playlist.entity';
import { ContentPlaylistService } from './content-playlist.service';

@Module({
    imports: [TypeOrmModule.forFeature([ContentPlaylistEntity, ContentEntity, PlaylistEntity, UserEntity])],
    controllers: [ContentPlaylistController],
    providers: [ContentPlaylistService]
})
export class ContentPlaylistModule {}
