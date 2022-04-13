import { Controller, UseGuards } from "@nestjs/common";
import { ApiAcceptedResponse, ApiUnauthorizedResponse, ApiBearerAuth, ApiNotFoundResponse, ApiTags } from "@nestjs/swagger";
import { Crud, CrudController } from "@nestjsx/crud";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CreateScreenDTO, UpdateScreenDTO } from "./screen.dto";
import { ScreenEntity } from "./screen.entity";
import { ScreenGuard } from "./screen.guard";
import { ScreenService } from "./screen.service";

@Crud({
    model: {
        type: ScreenEntity,
    },
    routes: {
        only: ['createOneBase', 'getOneBase', 'getManyBase', 'updateOneBase', 'deleteOneBase'],
        getOneBase: {
            decorators: [
                ApiAcceptedResponse({ description: 'Returns screen' }),
                ApiNotFoundResponse({ description: 'Screen not found' }),
            ],
        },
        getManyBase: {
            decorators: [
                ApiAcceptedResponse({ description: 'Returns all screens' })
            ],
        },
        createOneBase: {
            decorators: [
                UseGuards(JwtAuthGuard),
                ApiAcceptedResponse({ description: 'Creates screen' }),
                ApiUnauthorizedResponse({ description: 'Not authenticated' }),
            ],
        },
        updateOneBase: {
            decorators: [
                UseGuards(ScreenGuard),
                ApiAcceptedResponse({ description: 'Updates screen info' }),
                ApiUnauthorizedResponse({ description: 'Not authorized' }),
                ApiNotFoundResponse({ description: 'Screen not found' }),
            ],
        },
        deleteOneBase: {
            decorators: [
                UseGuards(ScreenGuard),
                ApiAcceptedResponse({ description: 'Deletes screen' }),
                ApiUnauthorizedResponse({ description: 'Not authorized' }),
                ApiNotFoundResponse({ description: 'Screen not found' }),
            ],
        },
    },
    dto: {
        create: CreateScreenDTO,
        update: UpdateScreenDTO,
    },
})
@Controller('screens')
@ApiTags('Screens')
@ApiBearerAuth()
export class ScreenController implements CrudController<ScreenEntity> {
    constructor(public service: ScreenService) { }
}