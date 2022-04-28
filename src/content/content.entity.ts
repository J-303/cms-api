import { UserEntity } from "../user/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('contents')
export class ContentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    url: string;

    @ManyToOne(type => UserEntity, owner => owner.contents, {cascade: true})
    owner?: UserEntity;

    @Column()
    ownerId: number;
}