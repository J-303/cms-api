import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { CreateEventDTO, EventDTOResponse, UpdateEventDTO } from './event.dto';
import { EventEntity } from './event.entity';
import { EventService } from './event.service';
import { ApiAcceptedResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { EventGuard } from './event.guard';
import { AuthGuard } from '@nestjs/passport';


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
                ApiOkResponse({type: EventDTOResponse}),
                ApiAcceptedResponse({ description: 'Returns all events' }),
            ],
        },
        getOneBase: {
            decorators: [
                ApiOkResponse({type: EventDTOResponse}),
                ApiAcceptedResponse({ description: 'Returns specified event' }),
                ApiNotFoundResponse({ description: 'Not found' }),
            ],
        },
        createOneBase: {
            decorators: [
                UseGuards(AuthGuard('jwt')),
                ApiOkResponse({type: EventDTOResponse}),
                ApiCreatedResponse({ description: 'Creates event' }),
                ApiUnauthorizedResponse({ description: 'Not authenticated' }),
            ],
        },
        updateOneBase: {
            decorators: [
                UseGuards(AuthGuard('jwt')),
                UseGuards(EventGuard),
                ApiOkResponse({type: EventDTOResponse}),
                ApiAcceptedResponse({ description: 'Updates event' }),
                ApiNotFoundResponse({ description: 'Not found' }),
                ApiUnauthorizedResponse({ description: 'Not authorized' }),
            ],
        },
        deleteOneBase: {
            decorators: [
                UseGuards(AuthGuard('jwt')),
                UseGuards(EventGuard),
                ApiOkResponse({type: EventDTOResponse}),
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
