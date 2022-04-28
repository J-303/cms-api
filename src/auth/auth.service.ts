import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class AuthService {
    constructor(private userRepo: UserRepository) {}

    async validateUser(userEmail: string, userPassword: string) {
        const user = await this.userRepo.findOne({where: {email: userEmail}});
        if (user && compare(userPassword, user.password)) {
            const {id, email} = user;
            return {id, email};
        }
        return null;
    }
}
