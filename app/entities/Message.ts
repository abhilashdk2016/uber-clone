import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ObjectType, Field, ID, Int } from 'type-graphql';
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

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    chatId: number;

    @Field(() => User) 
    @ManyToOne(() => User, user => user.messages)
    user: User;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    userId: number;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: string;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: string;
}