import Faker from "@faker-js/faker";
import { ScreenEntity } from "../../screen/screen.entity";
import { define } from "typeorm-seeding";

define(ScreenEntity, (faker: typeof Faker) => {
    const screen = new ScreenEntity;
    screen.name = faker.random.word();
    return screen;
})