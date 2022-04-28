import { UserEntity } from "../../user/user.entity";
import { define } from "typeorm-seeding";
import Faker from '@faker-js/faker'

define(UserEntity, (faker: typeof Faker) => {
    const user = new UserEntity;
    user.username = faker.internet.userName();
    user.email = faker.internet.email();
    user.password = faker.internet.password();
    return user;
})