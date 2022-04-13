import { UserEntity } from "src/user/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('content')
export class ContentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    url: string;

    @ManyToOne(type => UserEntity, owner => owner.contents, {cascade: true})
    owner: UserEntity
}