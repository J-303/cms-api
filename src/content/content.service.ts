import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { ContentEntity } from "./content.entity";
import { ContentRepository } from "./content.repository";

@Injectable()
export class ContentService extends TypeOrmCrudService<ContentEntity> {
    constructor(private contentRepo: ContentRepository) {
        super(contentRepo);
    }
}