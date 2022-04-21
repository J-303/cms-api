import { ContentEntity } from "../content/content.entity";
import { PlaylistEntity } from "../playlist/playlist.entity";
import { UserEntity } from "../user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('content_playlist')
export class ContentPlaylistEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    duration: number;

    @Column()
    position: number;

    @ManyToOne(type => ContentEntity)
    @JoinColumn({name: 'contentId'})
    content: ContentEntity;

    @ManyToOne(type => PlaylistEntity, playlist => playlist.contents, {cascade: true})
    @JoinColumn({name: 'playlistId'})
    playlist: PlaylistEntity;

    @ManyToOne(type => UserEntity)
    @JoinColumn({name: 'ownerId'})
    owner: UserEntity;
}