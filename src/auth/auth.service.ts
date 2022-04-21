import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService
    ) {}

    async validateUser(username: string, password: string) {
        const user = await this.userService.findOne({where: {username}});
        if (user && compare(password, user.password)) {
            const {password, ...result} = user;
            return result;
        }
        return null;
    }
}
