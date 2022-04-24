import { Controller, UseGuards } from "@nestjs/common";
import { ApiAcceptedResponse, ApiBearerAuth, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { Crud, CrudController } from "@nestjsx/crud";
import { PlaylistService } from "./playlist.service";
import { PlaylistEntity } from "./playlist.entity";
import { CreatePlaylistDTO, ResponsePlaylistDTO, UpdatePlaylistDTO } from "./playlist.dto";
import { AuthGuard } from "@nestjs/passport";
import { PlaylistOwnerGuard } from "./playlist.guard";

@Crud({
    model: {
        type: PlaylistEntity,
    },
    dto: {
        create: CreatePlaylistDTO,
        update: UpdatePlaylistDTO,
    },
    routes: {
        only: ['createOneBase', 'getOneBase', 'getManyBase', 'updateOneBase', 'deleteOneBase'],
        getManyBase: {
            decorators: [
                ApiOkResponse({type: ResponsePlaylistDTO}),
                ApiAcceptedResponse()
            ],
        },
        getOneBase: {
            decorators: [
                ApiOkResponse({type: ResponsePlaylistDTO}),
                ApiAcceptedResponse(),
                ApiNotFoundResponse()
            ],
        },
        createOneBase: {
            decorators: [
                UseGuards(AuthGuard('jwt')),
                ApiOkResponse({type: ResponsePlaylistDTO}),
                ApiAcceptedResponse(),
                ApiUnauthorizedResponse(),
            ],
        },
        updateOneBase: {
            decorators: [
                UseGuards(AuthGuard('jwt')),
                UseGuards(PlaylistOwnerGuard),
                ApiOkResponse({type: ResponsePlaylistDTO}),
                ApiAcceptedResponse(),
                ApiUnauthorizedResponse(),
                ApiNotFoundResponse(),
            ],
        },
        deleteOneBase: {
            decorators: [
                UseGuards(AuthGuard('jwt')),
                UseGuards(PlaylistOwnerGuard),
                ApiOkResponse({type: ResponsePlaylistDTO}),
                ApiAcceptedResponse(),
                ApiNotFoundResponse(),
                ApiUnauthorizedResponse(),
            ],
        },
    },
})
@Controller('playlists')
@ApiTags('Playlists')
@ApiBearerAuth()
export class PlaylistController implements CrudController<PlaylistEntity> {
    constructor(public service: PlaylistService) { }
}