import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { CreateEventDTO, UpdateEventDTO } from './event.dto';
import { EventEntity } from './event.entity';
import { EventService } from './event.service';
import { ApiAcceptedResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { EventGuard } from './event.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


@Crud({
    model: {
        type: EventEntity
    },
    dto: {
        create: CreateEventDTO,
        update: UpdateEventDTO
    },
    routes: {
        only: ['createOneBase', 'getOneBase', 'createOneBase', 'updateOneBase', 'deleteOneBase'],
        getManyBase: {
            decorators: [
                ApiAcceptedResponse({ description: 'Returns all events' }),
            ],
        },
        getOneBase: {
            decorators: [
                ApiAcceptedResponse({ description: 'Returns specified event' }),
                ApiNotFoundResponse({ description: 'Not found' }),
            ],
        },
        createOneBase: {
            decorators: [
                UseGuards(JwtAuthGuard),
                ApiCreatedResponse({ description: 'Creates event' }),
                ApiUnauthorizedResponse({ description: 'Not authenticated' }),
            ],
        },
        updateOneBase: {
            decorators: [
                UseGuards(EventGuard),
                ApiAcceptedResponse({ description: 'Updates event' }),
                ApiNotFoundResponse({ description: 'Not found' }),
                ApiUnauthorizedResponse({ description: 'Not authorized' }),
            ],
        },
        deleteOneBase: {
            decorators: [
                UseGuards(EventGuard),
                ApiAcceptedResponse({ description: 'Deletes event' }),
                ApiNotFoundResponse({ description: 'Not found' }),
                ApiUnauthorizedResponse({ description: 'Not authorized' }),
            ],
        },
    }
})
@Controller('events')
export class EventController implements CrudController<EventEntity> {
    constructor(public service: EventService) {}
}
