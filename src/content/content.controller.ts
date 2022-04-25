import { Controller, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiAcceptedResponse, ApiBearerAuth, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { Crud, CrudController } from "@nestjsx/crud";
import { CreateContentDTO, ResponseContentDTO, UpdateContentDTO } from "./content.dto";
import { ContentEntity } from "./content.entity";
import { ContentOwnerGuard } from "./content-owner.guard";
import { ContentService } from "./content.service";

@Crud({
    model: {
        type: ContentEntity,
    },
    dto: {
        create: CreateContentDTO,
        update: UpdateContentDTO,
    },
    routes: {
        only: ['createOneBase', 'getOneBase', 'getManyBase', 'updateOneBase', 'deleteOneBase'],
        getOneBase: {
            decorators: [
                ApiOkResponse({type: ResponseContentDTO}),
                ApiAcceptedResponse({ description: 'Returns specified content' }),
                ApiNotFoundResponse({ description: 'Not found' }),
            ],
        },
        getManyBase: {
            decorators: [
                ApiOkResponse({type: ResponseContentDTO}),
                ApiAcceptedResponse({ description: 'Returns all content' }),
            ],
        },
        createOneBase: {
            decorators: [
                UseGuards(AuthGuard('jwt')),
                ApiOkResponse({type: ResponseContentDTO}),
                ApiAcceptedResponse({ description: 'Creates content' }),
                ApiUnauthorizedResponse({ description: 'Not authenticated' }),
            ],
        },
        updateOneBase: {
            decorators: [
                UseGuards(AuthGuard('jwt')),
                UseGuards(ContentOwnerGuard),
                ApiOkResponse({type: ResponseContentDTO}),
                ApiAcceptedResponse({ description: 'Updates content' }),
                ApiNotFoundResponse({ description: 'Not found' }),
                ApiForbiddenResponse({ description: 'Not authorized' }),
            ],
        },
        deleteOneBase: {
            decorators: [
                UseGuards(AuthGuard('jwt')),
                UseGuards(ContentOwnerGuard),
                ApiOkResponse({type: ResponseContentDTO}),
                ApiAcceptedResponse({ description: 'Deletes content' }),
                ApiNotFoundResponse({ description: 'Not found' }),
                ApiForbiddenResponse({ description: 'Not authorized' }),
            ],
        },
    },
})
@Controller('contents')
@ApiTags('Content')
@ApiBearerAuth()
export class ContentController implements CrudController<ContentEntity> {
    constructor(public service: ContentService) { }
}