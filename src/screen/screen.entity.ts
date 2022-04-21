import { EventEntity } from "../event/event.entity";
import { PlaylistEntity } from "../playlist/playlist.entity";
import { UserEntity } from "../user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('screen')
export class ScreenEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(type => UserEntity)
    @JoinColumn({name: 'ownerId'})
    owner: UserEntity;

    @ManyToOne(type => EventEntity, event => event.screens, {cascade: true})
    @JoinColumn({name: 'eventId'})
    event: EventEntity;

    @OneToOne(type => PlaylistEntity)
    playlist: PlaylistEntity;
}