import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';
import { ContentRepository } from './content.repository';
import { UserRepository } from 'src/user/user.repository';

@Module({
    imports: [TypeOrmModule.forFeature([ContentRepository, UserRepository])],
    controllers: [ContentController],
    providers: [ContentService]
})
export class ContentModule {}
