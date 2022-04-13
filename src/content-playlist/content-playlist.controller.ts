import { Controller, UseGuards } from "@nestjs/common";
import { ApiAcceptedResponse, ApiBadRequestResponse, ApiBearerAuth, ApiNotFoundResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { Crud, CrudController } from "@nestjsx/crud";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CreateContentPlaylistDTO, UpdateContentPlaylistDTO } from "./content-playlist.dto";
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
                UseGuards(JwtAuthGuard),
                ApiAcceptedResponse({ description: 'Creates content' }),
                ApiUnauthorizedResponse({ description: 'Not authenticated' }),
            ],
        },
        getOneBase: {
            decorators: [
                ApiAcceptedResponse({ description: 'Returns specified content' }),
                ApiNotFoundResponse({ description: 'Content not found' }),
            ],
        },
        getManyBase: {
            decorators: [
                ApiAcceptedResponse({ description: 'Returns all content' }),
            ],
        },
        updateOneBase: {
            decorators: [
                UseGuards(ContentPlaylistGuard),
                ApiAcceptedResponse({ description: 'Updates content' }),
                ApiBadRequestResponse({ description: 'Not authorized' }),
                ApiNotFoundResponse({ description: 'Content not found' }),
            ],
        },
        deleteOneBase: {
            decorators: [
                UseGuards(ContentPlaylistGuard),
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