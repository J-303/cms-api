import { ForbiddenException, NotFoundException, CanActivate, ExecutionContext } from "@nestjs/common";
import { UserEntity } from "./user.entity";
import { getRepository, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

export class UserGuard implements CanActivate {
    constructor(
      @InjectRepository(UserEntity)
      private userRepo: Repository<UserEntity>
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const user_id = request.params.id;
        const modUser = await this.userRepo.findOne({
            where: { id: user_id }
        });
        if (!modUser) {
            throw new NotFoundException('Specified user does not exists');
        }

        const user = request.user;
        if (modUser.id == user.id) {
            return true;
        } else {
            throw new ForbiddenException('Cannot change other users info');
        }
    }
}