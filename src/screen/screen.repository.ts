import { EntityRepository, Repository } from "typeorm";
import { ScreenEntity } from "./screen.entity";

@EntityRepository(ScreenEntity)
export class ScreenRepository extends Repository<ScreenEntity> {}