import Faker from "@faker-js/faker";
import { PlaylistEntity } from "../../playlist/playlist.entity";
import { define } from "typeorm-seeding";

define(PlaylistEntity, (faker: typeof Faker) => {
    const playlist = new PlaylistEntity;
    playlist.name = faker.random.word();
    return playlist;
})