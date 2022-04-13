import { EventEntity } from "src/event/event.entity";
import { PlaylistEntity } from "src/playlist/playlist.entity";
import { UserEntity } from "src/user/user.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('screen')
export class ScreenEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(type => UserEntity)
    owner: UserEntity;

    @ManyToOne(type => EventEntity, event => event.screens, {cascade: true})
    event: EventEntity;

    @OneToOne(type => PlaylistEntity)
    playlist: PlaylistEntity;
}