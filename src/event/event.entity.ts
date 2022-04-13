import { ScreenEntity } from "src/screen/screen.entity";
import { UserEntity } from "src/user/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('event')
export class EventEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(type => UserEntity, owner => owner.events, {cascade: true})
    owner: UserEntity

    @OneToMany(type => ScreenEntity, screen => screen.event) 
    screens?: ScreenEntity[];
}