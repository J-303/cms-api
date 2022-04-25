import { ContentEntity } from "../content/content.entity";
import { PlaylistEntity } from "../playlist/playlist.entity";
import { UserEntity } from "../user/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IsOptional } from "class-validator";

@Entity('content_playlist')
export class ContentPlaylistEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    duration: number;

    @Column()
    position: number;

    @ManyToOne(type => ContentEntity)
    @IsOptional()
    content: ContentEntity;

    @Column()
    contentId: number;

    @ManyToOne(type => PlaylistEntity, playlist => playlist.contents, {cascade: true})
    @IsOptional()
    playlist: PlaylistEntity;

    @Column() 
    playlistId: number;

    @ManyToOne(type => UserEntity)    
    @IsOptional()
    owner: UserEntity;

    @Column()
    ownerId: number;
}