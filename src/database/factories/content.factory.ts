import Faker from "@faker-js/faker";
import { ContentEntity } from "../../content/content.entity";
import { define } from "typeorm-seeding";

define(ContentEntity, (faker: typeof Faker) => {
    const content = new ContentEntity;
    content.name = faker.random.word();
    content.url = faker.internet.url();
    return content;
})