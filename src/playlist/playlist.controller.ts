import { Controller, UseGuards } from "@nestjs/common";
import { ApiAcceptedResponse, ApiBadRequestResponse, ApiBearerAuth, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { Crud, CrudController } from "@nestjsx/crud";
import { PlaylistService } from "./playlist.service";
import { PlaylistEntity } from "./playlist.entity";
import { PlaylistGuard } from "./playlist.guard";
import { CreatePlaylistDTO, PlaylistDTOResponse, UpdatePlaylistDTO } from "./playlist.dto";
import { AuthGuard } from "@nestjs/passport";

@Crud({
    model: {
        type: PlaylistEntity,
    },
    routes: {
        only: ['createOneBase', 'getOneBase', 'getManyBase', 'updateOneBase', 'deleteOneBase'],
        createOneBase: {
            decorators: [
                UseGuards(AuthGuard('jwt')),
                ApiOkResponse({type: PlaylistDTOResponse}),
                ApiAcceptedResponse({ description: 'Creates playlist' }),
                ApiUnauthorizedResponse({ description: 'Not authenticated' }),
            ],
        },
        getOneBase: {
            decorators: [
                ApiOkResponse({type: PlaylistDTOResponse}),
                ApiAcceptedResponse({ description: 'Returns specified playlist' }),
                ApiNotFoundResponse({ description: 'Not found' })
            ],
        },
        getManyBase: {
            decorators: [
                ApiOkResponse({type: PlaylistDTOResponse}),
                ApiAcceptedResponse({ description: 'Returns all playlists' })
            ],
        },
        updateOneBase: {
            decorators: [
                UseGuards(PlaylistGuard),
                UseGuards(AuthGuard('jwt')),
                ApiOkResponse({type: PlaylistDTOResponse}),
                ApiAcceptedResponse({ description: 'Playlist updated' }),
                ApiUnauthorizedResponse({ description: 'Not authorized' }),
                ApiNotFoundResponse({ description: 'Not found' }),
            ],
        },
        deleteOneBase: {
            decorators: [
                UseGuards(PlaylistGuard),
                UseGuards(AuthGuard('jwt')),
                ApiOkResponse({type: PlaylistDTOResponse}),
                ApiAcceptedResponse({ description: 'Deletes playlist' }),
                ApiNotFoundResponse({ description: 'Not found' }),
                ApiUnauthorizedResponse({ description: 'Not authorized' }),
            ],
        },
    },
    dto: {
        create: CreatePlaylistDTO,
        update: UpdatePlaylistDTO,
    },
})
@ApiTags('Playlists')
@ApiBearerAuth()
@Controller('playlists')
export class PlaylistController implements CrudController<PlaylistEntity> {
    constructor(public service: PlaylistService) { }
}