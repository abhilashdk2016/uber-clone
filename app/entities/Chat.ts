import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ObjectType, Field, ID } from 'type-graphql';
import { Message } from './Message';
import { User } from './User';

@Entity()
@ObjectType()
export class Chat extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => [Message]) 
    @OneToMany(() => Message, message => message.chat)
    messages: Message[];

    @Field(() => [User]) 
    @OneToMany(() => User, user => user.chat)
    participants: User[];

    @Field(() => String) 
    @Column({ type: "text"})
    pickUpAddress: string;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: string;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: string;
}