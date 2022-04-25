import { EventEntity } from "../event/event.entity";
import { PlaylistEntity } from "../playlist/playlist.entity";
import { UserEntity } from "../user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { IsOptional } from "class-validator";

@Entity('screens')
export class ScreenEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(type => UserEntity)
    @IsOptional()
    owner: UserEntity;

    @Column()
    ownerId: number;

    @ManyToOne(type => EventEntity, event => event.screens, {cascade: true})
    @IsOptional()
    event: EventEntity;

    @Column()
    eventId: number;

    @OneToOne(type => PlaylistEntity)
    @IsOptional()
    playlist?: PlaylistEntity;

    @Column()
    playlistId?: number;
}