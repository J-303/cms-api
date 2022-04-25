import { ContentPlaylistEntity } from "../content-playlist/content-playlist.entity";
import { UserEntity } from "../user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IsOptional } from "class-validator";

@Entity('playlists')
export class PlaylistEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(type => UserEntity)   
    @IsOptional()
    owner: UserEntity;

    @Column()
    ownerId: number

    @OneToMany(type => ContentPlaylistEntity, entity => entity.playlist)
    @IsOptional()
    contents: ContentPlaylistEntity[]
}