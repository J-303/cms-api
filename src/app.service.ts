import { Injectable } from "@nestjs/common";
import { EntityManager } from "typeorm";
import { ContentPlaylistEntity } from "./content-playlist/content-playlist.entity";
import { ContentEntity } from "./content/content.entity";
import { EventEntity } from "./event/event.entity";
import { PlaylistEntity } from "./playlist/playlist.entity";
import { ScreenEntity } from "./screen/screen.entity";
import { Seed } from "./seed.class";
import { UserEntity } from "./user/user.entity";

@Injectable()
export class AppService extends Seed{
    constructor(entityManager: EntityManager) {
        super(entityManager);
        this.generateData(UserEntity);
        this.generateData(EventEntity);
        this.generateData(ScreenEntity);
        this.generateData(PlaylistEntity);
        this.generateData(ContentEntity);
        this.generateData(ContentPlaylistEntity);
    }
}