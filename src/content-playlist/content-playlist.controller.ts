import { Controller, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiAcceptedResponse, ApiBadRequestResponse, ApiBearerAuth, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { Crud, CrudController } from "@nestjsx/crud";
import { ContentPlaylistDTOResponse, CreateContentPlaylistDTO, UpdateContentPlaylistDTO } from "./content-playlist.dto";
import { ContentPlaylistEntity } from "./content-playlist.entity";
import { ContentPlaylistGuard } from "./content-playlist.guard";
import { ContentPlaylistService } from "./content-playlist.service";

@Crud({
    model: {
        type: ContentPlaylistEntity,
    },
    routes: {
        only: ['createOneBase', 'getOneBase', 'getManyBase', 'updateOneBase', 'deleteOneBase'],
        createOneBase: {
            decorators: [
                UseGuards(AuthGuard('jwt')),
                ApiOkResponse({type: ContentPlaylistDTOResponse}),
                ApiAcceptedResponse({ description: 'Creates content' }),
                ApiUnauthorizedResponse({ description: 'Not authenticated' }),
            ],
        },
        getOneBase: {
            decorators: [
                ApiOkResponse({type: ContentPlaylistDTOResponse}),
                ApiAcceptedResponse({ description: 'Returns specified content' }),
                ApiNotFoundResponse({ description: 'Content not found' }),
            ],
        },
        getManyBase: {
            decorators: [
                ApiOkResponse({type: ContentPlaylistDTOResponse}),
                ApiAcceptedResponse({ description: 'Returns all content' }),
            ],
        },
        updateOneBase: {
            decorators: [
                UseGuards(AuthGuard('jwt')),
                UseGuards(ContentPlaylistGuard),
                ApiOkResponse({type: ContentPlaylistDTOResponse}),
                ApiAcceptedResponse({ description: 'Updates content' }),
                ApiBadRequestResponse({ description: 'Not authorized' }),
                ApiNotFoundResponse({ description: 'Content not found' }),
            ],
        },
        deleteOneBase: {
            decorators: [
                UseGuards(AuthGuard('jwt')),
                UseGuards(ContentPlaylistGuard),
                ApiOkResponse({type: ContentPlaylistDTOResponse}),
                ApiAcceptedResponse({ description: 'Deletes content' }),
                ApiBadRequestResponse({ description: 'Not authorized' }),
                ApiNotFoundResponse({ description: 'Content not found' }),
            ],
        },
    },
    dto: {
        create: CreateContentPlaylistDTO,
        update: UpdateContentPlaylistDTO,
    },
})
@Controller('content-playlist')
@ApiTags('Content-Playlist')
@ApiBearerAuth()
export class ContentPlaylistController implements CrudController<ContentPlaylistEntity> {
    constructor(public service: ContentPlaylistService) { }
}