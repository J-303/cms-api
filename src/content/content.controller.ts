import { Controller, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiAcceptedResponse, ApiBearerAuth, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { Crud, CrudController } from "@nestjsx/crud";
import { ContentDTOResponse, CreateContentDTO, UpdateContentDTO } from "./content.dto";
import { ContentEntity } from "./content.entity";
import { ContentGuard } from "./content.guard";
import { ContentService } from "./content.service";

@Crud({
    model: {
        type: ContentEntity,
    },
    routes: {
        only: ['createOneBase', 'getOneBase', 'getManyBase', 'updateOneBase', 'deleteOneBase'],
        getOneBase: {
            decorators: [
                ApiOkResponse({type: ContentDTOResponse}),
                ApiAcceptedResponse({ description: 'Returns specified content' }),
                ApiNotFoundResponse({ description: 'Not found' }),
            ],
        },
        getManyBase: {
            decorators: [
                ApiOkResponse({type: ContentDTOResponse}),
                ApiAcceptedResponse({ description: 'Returns all content' }),
            ],
        },
        createOneBase: {
            decorators: [
                UseGuards(AuthGuard('jwt')),
                ApiOkResponse({type: ContentDTOResponse}),
                ApiAcceptedResponse({ description: 'Creates content' }),
                ApiUnauthorizedResponse({ description: 'Not authenticated' }),
            ],
        },
        updateOneBase: {
            decorators: [
                UseGuards(AuthGuard('jwt')),
                UseGuards(ContentGuard),
                ApiOkResponse({type: ContentDTOResponse}),
                ApiAcceptedResponse({ description: 'Updates content' }),
                ApiNotFoundResponse({ description: 'Not found' }),
                ApiForbiddenResponse({ description: 'Not authorized' }),
            ],
        },
        deleteOneBase: {
            decorators: [
                UseGuards(AuthGuard('jwt')),
                UseGuards(ContentGuard),
                ApiOkResponse({type: ContentDTOResponse}),
                ApiAcceptedResponse({ description: 'Deletes content' }),
                ApiNotFoundResponse({ description: 'Not found' }),
                ApiForbiddenResponse({ description: 'Not authorized' }),
            ],
        },
    },
    dto: {
        create: CreateContentDTO,
        update: UpdateContentDTO,
    },
})
@ApiTags('Content')
@Controller('contents')
@ApiBearerAuth()
export class ContentController implements CrudController<ContentEntity> {
    constructor(public service: ContentService) { }
}