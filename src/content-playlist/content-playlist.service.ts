import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Repository } from "typeorm";
import { ContentPlaylistEntity } from "./content-playlist.entity";

@Injectable()
export class ContentPlaylistService extends TypeOrmCrudService<ContentPlaylistEntity> {
    constructor(@InjectRepository(ContentPlaylistEntity) contentPlaylistRepo: Repository<ContentPlaylistEntity>) {
        super(contentPlaylistRepo);
    }
}