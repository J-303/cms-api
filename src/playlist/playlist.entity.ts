import { ContentPlaylistEntity } from "../content-playlist/content-playlist.entity";
import { UserEntity } from "../user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('playlist')
export class PlaylistEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(type => UserEntity)   
    @JoinColumn({name: 'ownerId'})
    owner: UserEntity;

    @OneToMany(type => ContentPlaylistEntity, entity => entity.playlist)
    contents: ContentPlaylistEntity[]
}