import { Controller, UseGuards } from "@nestjs/common";
import { ApiAcceptedResponse, ApiBadRequestResponse, ApiBearerAuth, ApiNotFoundResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { Crud, CrudController } from "@nestjsx/crud";
import { PlaylistService } from "./playlist.service";
import { PlaylistEntity } from "./playlist.entity";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { PlaylistGuard } from "./playlist.guard";
import { CreatePlaylistDTO, UpdatePlaylistDTO } from "./playlist.dto";

@Crud({
    model: {
        type: PlaylistEntity,
    },
    routes: {
        only: ['createOneBase', 'getOneBase', 'getManyBase', 'updateOneBase', 'deleteOneBase'],
        createOneBase: {
            decorators: [
                UseGuards(JwtAuthGuard),
                ApiAcceptedResponse({ description: 'Creates playlist' }),
                ApiUnauthorizedResponse({ description: 'Not authenticated' }),
            ],
        },
        getOneBase: {
            decorators: [
                ApiAcceptedResponse({ description: 'Returns specified playlist' }),
                ApiNotFoundResponse({ description: 'Not found' })
            ],
        },
        getManyBase: {
            decorators: [
                ApiAcceptedResponse({ description: 'Returns all playlists' })
            ],
        },
        updateOneBase: {
            decorators: [
                UseGuards(PlaylistGuard),
                UseGuards(JwtAuthGuard),
                ApiAcceptedResponse({ description: 'Playlist updated' }),
                ApiUnauthorizedResponse({ description: 'Not authorized' }),
                ApiNotFoundResponse({ description: 'Not found' }),
            ],
        },
        deleteOneBase: {
            decorators: [
                UseGuards(PlaylistGuard),
                UseGuards(JwtAuthGuard),
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