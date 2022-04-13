import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';
import { ContentEntity } from './content.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ContentEntity, UserEntity])],
    controllers: [ContentController],
    providers: [ContentService]
})
export class ContentModule {}
