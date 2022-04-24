import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentRepository } from 'src/content/content.repository';
import { PlaylistRepository } from 'src/playlist/playlist.repository';
import { UserRepository } from 'src/user/user.repository';
import { ContentPlaylistController } from './content-playlist.controller';
import { ContentPlaylistRepository } from './content-playlist.repository';
import { ContentPlaylistService } from './content-playlist.service';

@Module({
    imports: [TypeOrmModule.forFeature([ContentPlaylistRepository, ContentRepository, PlaylistRepository, UserRepository])],
    controllers: [ContentPlaylistController],
    providers: [ContentPlaylistService]
})
export class ContentPlaylistModule {}
