import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { EventModule } from './event/event.module';
import { ScreenModule } from './screen/screen.module';
import { ContentModule } from './content/content.module';
import { PlaylistModule } from './playlist/playlist.module';
import { ContentPlaylistModule } from './content-playlist/content-playlist.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    PassportModule.register({}),
    TypeOrmModule.forRoot(),
    UserModule,
    AuthModule,
    EventModule,
    ScreenModule,
    ContentModule,
    PlaylistModule,
    ContentPlaylistModule,
  ],
})
export class AppModule {}