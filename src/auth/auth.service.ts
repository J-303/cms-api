import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService    
    ) {}

    async validateUser(username: string, password: string) {
        const user = await this.userService.findOne({where: {username}});
        if (user && compare(password, user.password)) {
            const {password, ...result} = user;
            return result;
        }
        return null;
    }

    async login(user) {
        const payload = { username: user.username, id: user.id };
        return { access_token: this.jwtService.sign(payload) };
    }

    async register(newUser: CreateUserDTO) {
        let user = await this.userService.findOne({where: {email: newUser.email}});
        if (user) throw new ConflictException('Email is already used');
        user = await this.userService.register(newUser);
        return await this.login(user);
    }
}
