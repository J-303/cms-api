import { NotFoundException, ForbiddenException, CanActivate, ExecutionContext } from "@nestjs/common";
import { PlaylistEntity } from "./playlist.entity";
import { UserEntity } from "src/user/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

export class PlaylistGuard implements CanActivate {
    constructor(
        @InjectRepository(UserEntity)
        private userRepo: Repository<UserEntity>,
        @InjectRepository(PlaylistEntity)
        private playlistRepo: Repository<PlaylistEntity>
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const playlist_id = request.params.id;

        const modPlaylist = await this.playlistRepo.findOne({
            where: { id: playlist_id },
            relations: ['owner']
        });
        if (!modPlaylist) {
            throw new NotFoundException('Specified playlist does not exists');
        }
        const owner = await this.userRepo.findOne({
            where: { id: modPlaylist.owner.id }
        });

        const user = request.user;
        if (user.id == owner.id) {
            return true;
        } else {
            throw new ForbiddenException('You are not the owner of specified playlist');
        }
    }
}