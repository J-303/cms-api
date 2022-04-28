import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { PlaylistEntity } from "./playlist.entity";
import { PlaylistRepository } from "./playlist.repository";

@Injectable()
export class PlaylistService extends TypeOrmCrudService<PlaylistEntity> {
    constructor(private playlistRepo: PlaylistRepository) {
        super(playlistRepo);
    }
}