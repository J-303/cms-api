import { ScreenEntity } from "../screen/screen.entity";
import { UserEntity } from "../user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('event')
export class EventEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(type => UserEntity, owner => owner.events, {cascade: true})    
    @JoinColumn({name: 'ownerId'})
    owner: UserEntity

    @OneToMany(type => ScreenEntity, screen => screen.event) 
    screens?: ScreenEntity[];
}