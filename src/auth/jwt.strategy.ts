import { NotFoundException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserRepository } from "src/user/user.repository";

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private userRepo: UserRepository
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET
        });
    }

    async validate(payload: any) {
        console.log(payload);
        const user = await this.userRepo.findOne({where: {email: payload.email}})
        if (!user) throw new NotFoundException('User not found');
        return {id: user.id, email: user.email};
    }
}