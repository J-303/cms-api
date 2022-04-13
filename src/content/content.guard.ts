import { NotFoundException, CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { ContentEntity } from "./content.entity";
import { UserEntity } from "src/user/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

export class ContentGuard implements CanActivate {
    constructor(
        @InjectRepository(ContentEntity)
        private contentRepo: Repository<ContentEntity>,
        @InjectRepository(UserEntity)
        private userRepo: Repository<UserEntity>
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const modContent = await this.contentRepo.findOne({
            where: { id: request.params.id },
            relations: ['owner']
        })
        if (!modContent) {
            throw new NotFoundException('Specified content does not exists');
        }

        const owner = await this.userRepo.findOne({
            where: { id: modContent.owner.id }
        })

        const user = request.user;
        if (user.id == owner.id) {
            return true;
        } else {
            throw new ForbiddenException('You are not the owner of specified content');
        }
    }
}