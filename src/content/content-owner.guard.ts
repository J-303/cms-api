import { NotFoundException, CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ContentRepository } from "./content.repository";

export class ContentOwnerGuard implements CanActivate {
    constructor(
        @InjectRepository(ContentRepository)
        private contentRepo: ContentRepository
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const content = await this.contentRepo.findOne({where: { id: request.params.id }})
        if (!content) throw new NotFoundException();

        const user = request.user;
        if (user.id != content.ownerId) throw new ForbiddenException();
        return true;
    }
}