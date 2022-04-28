import { ContentPlaylistEntity } from "../content-playlist/content-playlist.entity";
import { UserEntity } from "../user/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('playlists')
export class PlaylistEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(type => UserEntity)   
    owner?: UserEntity;

    @Column()
    ownerId: number

    @OneToMany(type => ContentPlaylistEntity, entity => entity.playlist)
    contents?: ContentPlaylistEntity[]
}