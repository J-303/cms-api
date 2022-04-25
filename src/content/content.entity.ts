import { UserEntity } from "../user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IsOptional } from "class-validator";

@Entity('contents')
export class ContentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    url: string;

    @ManyToOne(type => UserEntity, owner => owner.contents, {cascade: true})
    @IsOptional()
    owner: UserEntity;

    @Column()
    ownerId: number;
}