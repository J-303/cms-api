import { EntityRepository, Repository } from "typeorm";
import { ContentPlaylistEntity } from "./content-playlist.entity";

@EntityRepository(ContentPlaylistEntity)
export class ContentPlaylistRepository extends Repository<ContentPlaylistEntity> {}