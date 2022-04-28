import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { ContentPlaylistEntity } from "./content-playlist.entity";
import { ContentPlaylistRepository } from "./content-playlist.repository";

@Injectable()
export class ContentPlaylistService extends TypeOrmCrudService<ContentPlaylistEntity> {
    constructor(private contentPlaylistRepo: ContentPlaylistRepository) {
        super(contentPlaylistRepo);
    }
}