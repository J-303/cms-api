import { ScreenEntity } from "../screen/screen.entity";
import { UserEntity } from "../user/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('events')
export class EventEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(type => UserEntity, owner => owner.events, {cascade: true})    
    owner: UserEntity

    @Column()
    ownerId: number;

    @OneToMany(type => ScreenEntity, screen => screen.event) 
    screens?: ScreenEntity[];
}