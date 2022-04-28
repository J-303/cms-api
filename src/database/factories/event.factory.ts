import Faker from "@faker-js/faker";
import { EventEntity } from "../../event/event.entity";
import { define } from "typeorm-seeding";

define(EventEntity, (faker: typeof Faker) => {
    const event = new EventEntity;
    event.name = faker.random.word();
    return event;
})