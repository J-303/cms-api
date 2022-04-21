import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO, LoginUserDTO, UserDTOResponse } from './user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService extends TypeOrmCrudService<UserEntity> {
    constructor(   
        @InjectRepository(UserEntity)
        public userRepo: Repository<UserEntity>,
        private jwtService: JwtService
    ) {
        super(userRepo);
    }

    async login(user: LoginUserDTO) {
        const userResponse: UserDTOResponse = await this.userRepo.findOne({where: {email: user.email}});
        const payload = { username: user.email, password: user.password };
        return { access_token: this.jwtService.sign(payload), user: userResponse };
    }

    async register(data: CreateUserDTO) {
        let user = await this.userRepo.findOne({where:{email: data.email}})
        if (user) throw new ConflictException('Email is already used');

        user = this.userRepo.create(data);
        await this.repo.save(user);

        user = await this.findOne({where:{username: data.username}});
        return await this.login(user);
    }
}
