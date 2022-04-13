import { ContentPlaylistEntity } from "src/content-playlist/content-playlist.entity";
import { UserEntity } from "src/user/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('playlist')
export class PlaylistEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(type => UserEntity)
    owner: UserEntity;

    @OneToMany(type => ContentPlaylistEntity, entity => entity.playlist)
    contents: ContentPlaylistEntity[]
}