import { Controller, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiAcceptedResponse, ApiUnauthorizedResponse, ApiBearerAuth, ApiNotFoundResponse, ApiTags, ApiOkResponse } from "@nestjs/swagger";
import { Crud, CrudController } from "@nestjsx/crud";
import { CreateScreenDTO, ResponseScreenDTO, UpdateScreenDTO } from "./screen.dto";
import { ScreenEntity } from "./screen.entity";
import { ScreenOwnerGuard } from "./screen.guard";
import { ScreenService } from "./screen.service";

@Crud({
    model: {
        type: ScreenEntity,
    },
    dto: {
        create: CreateScreenDTO,
        update: UpdateScreenDTO,
    },
    routes: {
        only: ['createOneBase', 'getOneBase', 'getManyBase', 'updateOneBase', 'deleteOneBase'],
        getOneBase: {
            decorators: [
                ApiOkResponse({type: ResponseScreenDTO}),
                ApiAcceptedResponse(),
                ApiNotFoundResponse(),
            ],
        },
        getManyBase: {
            decorators: [
                ApiOkResponse({type: ResponseScreenDTO}),
                ApiAcceptedResponse()
            ],
        },
        createOneBase: {
            decorators: [
                UseGuards(AuthGuard('jwt')),
                ApiOkResponse({type: ResponseScreenDTO}),
                ApiAcceptedResponse(),
                ApiUnauthorizedResponse(),
            ],
        },
        updateOneBase: {
            decorators: [
                UseGuards(AuthGuard('jwt')),
                UseGuards(ScreenOwnerGuard),
                ApiOkResponse({type: ResponseScreenDTO}),
                ApiAcceptedResponse(),
                ApiUnauthorizedResponse(),
                ApiNotFoundResponse(),
            ],
        },
        deleteOneBase: {
            decorators: [
                UseGuards(AuthGuard('jwt')),
                UseGuards(ScreenOwnerGuard),
                ApiOkResponse({type: ResponseScreenDTO}),
                ApiAcceptedResponse(),
                ApiUnauthorizedResponse(),
                ApiNotFoundResponse(),
            ],
        },
    },
})
@Controller('screens')
@ApiTags('Screens')
@ApiBearerAuth()
export class ScreenController implements CrudController<ScreenEntity> {
    constructor(public service: ScreenService) { }
}