import { EntityManager } from "typeorm";
import { ContentPlaylistEntity } from "./content-playlist/content-playlist.entity";
import { ContentEntity } from "./content/content.entity";
import { EventEntity } from "./event/event.entity";
import { PlaylistEntity } from "./playlist/playlist.entity";
import { ScreenEntity } from "./screen/screen.entity";
import { UserEntity } from "./user/user.entity";
import { faker } from '@faker-js/faker'

export class Seed {
    constructor(private readonly entityManager: EntityManager) {}

    generateData<T>(entity: any) {
        switch(entity) {
            case UserEntity:
                this.addData(this.userData(), UserEntity);
                break;
            case EventEntity:
                this.addData(this.eventData(), EventEntity);
                break;
            case ScreenEntity:
                this.addData(this.screenData(), ScreenEntity);
                break;
            case PlaylistEntity:
                this.addData(this.playlistData(), PlaylistEntity);
                break;
            case ContentEntity:
                this.addData(this.contentData(), ContentEntity);
                break;
            case ContentPlaylistEntity:
                this.addData(this.contentPlaylistData(), ContentPlaylistEntity);
                break;
            default:
                break;
        }
    }

    private userData(): Array<Partial<UserEntity>> {
        return Array.from({length: 50}).map<Partial<UserEntity>>(() => {
            return {
                username: faker.internet.userName(),
                email: faker.internet.email(),
                password: faker.internet.password()
            };
        });
    }

    private eventData(): Array<Partial<EventEntity>> {
        return Array.from({length: 50}).map<Partial<EventEntity>>(() => {
            return {
                name: faker.word.noun()
            };
        });
    }

    private screenData(): Array<Partial<ScreenEntity>> {
        return Array.from({length: 50}).map<Partial<ScreenEntity>>(() => {
            return {
                name: faker.word.noun()
            };
        });
    }

    private playlistData(): Array<Partial<PlaylistEntity>> {
        return Array.from({length: 50}).map<Partial<PlaylistEntity>>(() => {
            return {
                name: faker.word.noun()
            };
        });
    }

    private contentData(): Array<Partial<ContentEntity>> {
        return Array.from({length: 50}).map<Partial<ContentEntity>>(() => {
            return {
                name: faker.word.noun(),
                url: faker.internet.url()
            };
        });
    }

    private contentPlaylistData(): Array<Partial<ContentPlaylistEntity>> {
        return Array.from({length: 50}).map<Partial<ContentPlaylistEntity>>(() => {
            return {
                duration: faker.random.number({max: 20}),
                position: faker.random.number({max: 20})
            };
        });
    }

    private addData<T>(data: Array<Partial<T>>, entity: any) {
        this.entityManager.save<T, T>(entity, data as any);
    }
}