import { ForbiddenException, NotFoundException, CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { UserEntity } from "src/user/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { ContentPlaylistEntity } from "./content-playlist.entity";
import { Repository } from "typeorm";

@Injectable()
export class ContentPlaylistGuard implements CanActivate {
    constructor(
        @InjectRepository(ContentPlaylistEntity)
        private contentPlaylistpRepo: Repository<ContentPlaylistEntity>,
        @InjectRepository(UserEntity)
        private userRepo: Repository<UserEntity>
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const playlistId = request.params.id;
        const modPlaylist = await this.contentPlaylistpRepo.findOne({
            where: { id: playlistId }
        });
        if (!modPlaylist) {
            throw new NotFoundException('Specified playlist does not exists');
        }
        const owner = await this.userRepo.findOne({
            where: { id: modPlaylist.owner.id }
        })

        const user = request.user;
        if (user.id == owner.id) {
            return true;
        } else {
            throw new ForbiddenException('You are not the owner of specified playlist');
        }
    }
}