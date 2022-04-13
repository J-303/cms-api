import { Injectable, CanActivate, ExecutionContext, NotFoundException, ForbiddenException } from "@nestjs/common";
import { ScreenEntity } from "../screen/screen.entity";
import { UserEntity } from "src/user/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class ScreenGuard implements CanActivate {
    constructor(
        @InjectRepository(ScreenEntity)
        private screenRepo: Repository<ScreenEntity>,
        @InjectRepository(UserEntity)
        private userRepo: Repository<UserEntity>,
    ) {}


    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const screen_id = request.params.id;

        const modScreen = await this.screenRepo.findOne({
            where: { id: screen_id },
            relations: ['owner']
        });
        if (!modScreen) {
            throw new NotFoundException('Screen specified does not exists');
        }
        const owner = await this.userRepo.findOne({
            where: { id: modScreen.owner.id }
        });

        const user = request.user;
        if (user.id == owner.id) {
            return true;
        } else {
            throw new ForbiddenException('You are not the owner of specified screen');
        }
    }
}