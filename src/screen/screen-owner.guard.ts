import { Injectable, CanActivate, ExecutionContext, NotFoundException, ForbiddenException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ScreenRepository } from "./screen.repository";

@Injectable()
export class ScreenOwnerGuard implements CanActivate {
    constructor(
        @InjectRepository(ScreenRepository)
        private screenRepo: ScreenRepository,
    ) {}


    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const screen = await this.screenRepo.findOne({where: {id: request.params.id}});
        if (!screen) throw new NotFoundException();

        const user = request.user;
        if (user.id != screen.ownerId) throw new ForbiddenException();

        return true;
    }
}