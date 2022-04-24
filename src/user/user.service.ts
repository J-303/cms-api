import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { CreateUserDTO, ResponseUserDTO } from './user.dto';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService extends TypeOrmCrudService<UserEntity> {
    constructor(
        private userRepo: UserRepository,
        private jwtService: JwtService
    ) {
        super(userRepo);
    }

    async login(user: {id: number, email: string}) {
        const userObject = await this.userRepo.findOne({where: {email: user.email}});
        const userResponse: ResponseUserDTO = userObject;
        return { access_token: this.jwtService.sign(user), user: userResponse }
    }

    async register(dto: CreateUserDTO) {
        const emailCheck = await this.userRepo.findOne({where: {email: dto.email}});
        if (emailCheck) throw new ForbiddenException('Email is already in use');

        const user = this.userRepo.create(dto);
        await this.userRepo.save(user);

        const userResponse: ResponseUserDTO = user;
        const payload = {id: user.id, email: user.email};
        return { access_token: this.jwtService.sign(payload), user: userResponse }
    }
}
