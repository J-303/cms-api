import { ForbiddenException, NotFoundException, CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ContentPlaylistRepository } from "./content-playlist.repository";

@Injectable()
export class ContentPlaylistOwnerGuard implements CanActivate {
    constructor(
        @InjectRepository(ContentPlaylistRepository)
        private contentPlaylistpRepo: ContentPlaylistRepository
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const content_playlist = await this.contentPlaylistpRepo.findOne({where: {id: request.params.id}});
        if (!content_playlist) throw new NotFoundException();

        const user = request.user;
        if (user.id != content_playlist.ownerId) throw new ForbiddenException();
        return true;
    }
}