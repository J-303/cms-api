import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { ScreenEntity } from "./screen.entity";
import { ScreenRepository } from "./screen.repository";

@Injectable()
export class ScreenService extends TypeOrmCrudService<ScreenEntity> {
    constructor(private screenRepo: ScreenRepository) {
        super(screenRepo);
    }
}