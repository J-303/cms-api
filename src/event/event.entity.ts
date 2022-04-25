import { ScreenEntity } from "../screen/screen.entity";
import { UserEntity } from "../user/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IsOptional } from "class-validator";

@Entity('events')
export class EventEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(type => UserEntity, owner => owner.events, {cascade: true})    
    @IsOptional()
    owner: UserEntity

    @Column()
    ownerId: number;

    @OneToMany(type => ScreenEntity, screen => screen.event) 
    @IsOptional()
    screens?: ScreenEntity[];
}