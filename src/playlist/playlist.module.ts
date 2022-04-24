import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentPlaylistRepository } from 'src/content-playlist/content-playlist.repository';
import { UserRepository } from 'src/user/user.repository';
import { PlaylistController } from './playlist.controller';
import { PlaylistRepository } from './playlist.repository';
import { PlaylistService } from './playlist.service';

@Module({
    imports: [TypeOrmModule.forFeature([PlaylistRepository, UserRepository, ContentPlaylistRepository])],
    controllers: [PlaylistController],
    providers: [PlaylistService]
})
export class PlaylistModule {}
