import { ContentEntity } from "src/content/content.entity";
import { PlaylistEntity } from "src/playlist/playlist.entity";
import { UserEntity } from "src/user/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ContentPlaylistEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    duration: number;

    @Column()
    position: number;

    @ManyToOne(type => ContentEntity)
    content: ContentEntity;

    @ManyToOne(type => PlaylistEntity, playlist => playlist.contents, {cascade: true})
    playlist: PlaylistEntity;

    @ManyToOne(type => UserEntity)
    owner: UserEntity;
}