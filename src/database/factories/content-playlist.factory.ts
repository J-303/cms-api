import Faker from "@faker-js/faker";
import { ContentPlaylistEntity } from "../../content-playlist/content-playlist.entity";
import { define } from "typeorm-seeding";

define(ContentPlaylistEntity, (faker: typeof Faker) => {
    const content_playlist = new ContentPlaylistEntity;
    content_playlist.duration = faker.random.number({min: 5, max: 30});
    content_playlist.position = faker.random.number({min: 1, max: 10});
    return content_playlist;
})