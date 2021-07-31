import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ObjectType, Field, ID } from 'type-graphql';
import { User } from "./User";
import { Chat } from "./Chat";

@Entity()
@ObjectType()
export class Message extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String) 
    @Column({ type: "text"})
    text: string;

    @Field(() => Chat) 
    @ManyToOne(() => Chat, chat => chat.messages)
    chat: Chat;

    @Field(() => User) 
    @ManyToOne(() => User, user => user.messages)
    user: User;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: string;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: string;
}