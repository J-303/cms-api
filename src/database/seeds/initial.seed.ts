import { ContentPlaylistEntity } from "../../content-playlist/content-playlist.entity";
import { ContentEntity } from "../../content/content.entity";
import { EventEntity } from "../../event/event.entity";
import { PlaylistEntity } from "../../playlist/playlist.entity";
import { ScreenEntity } from "../../screen/screen.entity";
import { UserEntity } from "../../user/user.entity";
import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";

export class CreateData implements Seeder {
    public async run(factory: Factory, connection: Connection) {
        const users = await factory(UserEntity)().createMany(10);
        const events = await factory(EventEntity)().createMany(25);
        const screens = await factory(ScreenEntity)().createMany(40);
        const playlists = await factory(PlaylistEntity)().createMany(40);
        const content = await factory(ContentEntity)().createMany(100);
        const content_playlist = await factory(ContentPlaylistEntity)().createMany(200);
    }
}