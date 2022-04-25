import { Controller, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiAcceptedResponse, ApiBearerAuth, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { Crud, CrudController } from "@nestjsx/crud";
import { CreateContentPlaylistDTO, ResponseContentPlaylistDTO, UpdateContentPlaylistDTO } from "./content-playlist.dto";
import { ContentPlaylistEntity } from "./content-playlist.entity";
import { ContentPlaylistOwnerGuard } from "./content-playlist-owner.guard";
import { ContentPlaylistService } from "./content-playlist.service";

@UseGuards(AuthGuard('jwt'))
@Crud({
    model: {
        type: ContentPlaylistEntity,
    },
    dto: {
        create: CreateContentPlaylistDTO,
        update: UpdateContentPlaylistDTO,
    },
    routes: {
        only: ['createOneBase', 'getOneBase', 'getManyBase', 'updateOneBase', 'deleteOneBase'],
        getManyBase: {
            decorators: [
                ApiOkResponse({type: ResponseContentPlaylistDTO}),
                ApiAcceptedResponse(),
            ],
        },
        getOneBase: {
            decorators: [
                ApiOkResponse({type: ResponseContentPlaylistDTO}),
                ApiAcceptedResponse(),
                ApiNotFoundResponse(),
            ],
        },
        createOneBase: {
            decorators: [
                ApiOkResponse({type: ResponseContentPlaylistDTO}),
                ApiAcceptedResponse(),
                ApiUnauthorizedResponse(),
            ],
        },
        updateOneBase: {
            decorators: [
                UseGuards(ContentPlaylistOwnerGuard),
                ApiOkResponse({type: ResponseContentPlaylistDTO}),
                ApiAcceptedResponse(),
                ApiNotFoundResponse(),
            ],
        },
        deleteOneBase: {
            decorators: [
                UseGuards(ContentPlaylistOwnerGuard),
                ApiOkResponse({type: ResponseContentPlaylistDTO}),
                ApiAcceptedResponse(),
                ApiNotFoundResponse(),
            ],
        },
    },
})
@Controller('content-playlist')
@ApiTags('Content-Playlist')
@ApiBearerAuth()
export class ContentPlaylistController implements CrudController<ContentPlaylistEntity> {
    constructor(public service: ContentPlaylistService) { }
}