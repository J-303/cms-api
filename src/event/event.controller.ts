import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { CreateEventDTO, ResponseEventDTO, UpdateEventDTO } from './event.dto';
import { EventEntity } from './event.entity';
import { EventService } from './event.service';
import { ApiAcceptedResponse, ApiBearerAuth, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { EventOwnerGuard } from './event.guard';


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
                ApiOkResponse({type: ResponseEventDTO}),
                ApiAcceptedResponse(),
            ],
        },
        getOneBase: {
            decorators: [
                ApiOkResponse({type: ResponseEventDTO}),
                ApiAcceptedResponse(),
                ApiNotFoundResponse(),
            ],
        },
        createOneBase: {
            decorators: [
                UseGuards(AuthGuard('jwt')),
                ApiCreatedResponse({type: ResponseEventDTO}),
                ApiUnauthorizedResponse(),
            ],
        },
        updateOneBase: {
            decorators: [
                UseGuards(AuthGuard('jwt')),
                UseGuards(EventOwnerGuard),
                ApiOkResponse({type: ResponseEventDTO}),
                ApiAcceptedResponse(),
                ApiNotFoundResponse(),
                ApiUnauthorizedResponse(),
            ],
        },
        deleteOneBase: {
            decorators: [
                UseGuards(AuthGuard('jwt')),
                UseGuards(EventOwnerGuard),
                ApiOkResponse({type: ResponseEventDTO}),
                ApiAcceptedResponse(),
                ApiNotFoundResponse(),
                ApiUnauthorizedResponse(),
            ],
        },
    }
})
@Controller('events')
@ApiTags('Events')
@ApiBearerAuth()
export class EventController implements CrudController<EventEntity> {
    constructor(public service: EventService) {}
}
