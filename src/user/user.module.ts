import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentRepository } from 'src/content/content.repository';
import { EventRepository } from 'src/event/event.repository';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, EventRepository, ContentRepository]),
    JwtModule.register({
      secret: `${process.env.JWT_SECRET}`,
      signOptions: {expiresIn: '1d'}
    })
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}