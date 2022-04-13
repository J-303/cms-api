import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService extends TypeOrmCrudService<UserEntity> {
    constructor(@InjectRepository(UserEntity) userRepo: Repository<UserEntity>) {
        super(userRepo);
    }

    public async register(dto: CreateUserDTO) {
        const user = this.repo.create(dto);
        await this.repo.save(user);
        return this.findOne({where:{username: dto.username}});
    }
}
