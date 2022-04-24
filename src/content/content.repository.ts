import { EntityRepository, Repository } from "typeorm";
import { ContentEntity } from "./content.entity";

@EntityRepository(ContentEntity)
export class ContentRepository extends Repository<ContentEntity> {}