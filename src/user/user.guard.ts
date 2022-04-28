import { CanActivate, ExecutionContext, ForbiddenException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "./user.repository";

export class UserGuard implements CanActivate {
    constructor(
        @InjectRepository(UserRepository)
        private userRepo: UserRepository
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const userCheck = await this.userRepo.findOne({where: {id: request.params.id}});
        if (!userCheck) throw new NotFoundException();

        const user = request.user;
        if (!user) throw new UnauthorizedException();
        if (user.id != userCheck.id) throw new ForbiddenException();

        return true;
    }
}