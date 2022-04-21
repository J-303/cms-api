import { UserEntity } from "../user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('content')
export class ContentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    url: string;

    @ManyToOne(type => UserEntity, owner => owner.contents, {cascade: true})
    @JoinColumn({name: 'ownerId'})
    owner: UserEntity;

    ownerId: number;
}