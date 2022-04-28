import { NotFoundException, ForbiddenException, CanActivate, ExecutionContext } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PlaylistRepository } from "./playlist.repository";

export class PlaylistOwnerGuard implements CanActivate {
    constructor(
        @InjectRepository(PlaylistRepository)
        private playlistRepo: PlaylistRepository
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const playlist_id = request.params.id;

        const playlist = await this.playlistRepo.findOne({where: { id: playlist_id }});
        if (!playlist) throw new NotFoundException('Specified playlist does not exists');

        const user = request.user;
        if (user.id != playlist.ownerId) throw new ForbiddenException('You are not the owner of specified playlist');
        return true;
    }
}