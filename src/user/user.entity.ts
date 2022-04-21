import { EventEntity } from "../event/event.entity";
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { hash } from 'bcrypt'
import { ContentEntity } from "../content/content.entity";

@Entity('user')
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
    events?: EventEntity[];

    @OneToMany(type => ContentEntity, content => content.owner)
    contents?: ContentEntity[];

    @BeforeInsert()
    async hashPassword() {
        this.password = await hash(this.password, 10);
    }
}