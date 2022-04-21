import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventModule } from './event/event.module';
import { ScreenModule } from './screen/screen.module';
import { PlaylistModule } from './playlist/playlist.module';
import { ContentModule } from './content/content.module';
import { ContentPlaylistModule } from './content-playlist/content-playlist.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    AuthModule,
    EventModule,
    ScreenModule,
    PlaylistModule,
    ContentModule,
    ContentPlaylistModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
