import { EventEntity } from "../event/event.entity";
import { PlaylistEntity } from "../playlist/playlist.entity";
import { UserEntity } from "../user/user.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('screens')
export class ScreenEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(type => UserEntity)
    owner?: UserEntity;

    @Column()
    ownerId: number;

    @ManyToOne(type => EventEntity, event => event.screens, {cascade: true})
    event?: EventEntity;

    @Column()
    eventId: number;

    @OneToOne(type => PlaylistEntity)
    playlist?: PlaylistEntity;

    @Column()
    playlistId?: number;
}