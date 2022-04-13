import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Repository } from "typeorm";
import { PlaylistEntity } from "./playlist.entity";

@Injectable()
export class PlaylistService extends TypeOrmCrudService<PlaylistEntity> {
    constructor(@InjectRepository(PlaylistEntity) playlistRepo: Repository<PlaylistEntity>) {
        super(playlistRepo);
    }
}