import { EventEntity } from "../event/event.entity";
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { hash } from 'bcrypt'
import { ContentEntity } from "../content/content.entity";
import { IsOptional } from "class-validator";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column({unique: true})
    email: string;
    
    @Column()
    password: string;

    @OneToMany(type => EventEntity, event => event.owner)
    @IsOptional()
    events?: EventEntity[];

    @OneToMany(type => ContentEntity, content => content.owner)
    @IsOptional()
    contents?: ContentEntity[];

    @BeforeInsert()
    async hashPassword() {
        this.password = await hash(this.password, parseInt(process.env.HASH_SALT));
    }
}