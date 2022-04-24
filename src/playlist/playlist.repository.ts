import { EntityRepository, Repository } from "typeorm";
import { PlaylistEntity } from "./playlist.entity";

@EntityRepository(PlaylistEntity)
export class PlaylistRepository extends Repository<PlaylistEntity> {}