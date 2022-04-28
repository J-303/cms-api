import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { EventEntity } from './event.entity';
import { EventRepository } from './event.repository';

@Injectable()
export class EventService extends TypeOrmCrudService<EventEntity>{
    constructor(private eventRepo: EventRepository) {
        super(eventRepo);
    }
}
