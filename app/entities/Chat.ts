import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ObjectType, Field, ID, Int } from 'type-graphql';
import { Message } from './Message';
import { User } from './User';
import { Ride } from "./Ride";

@Entity()
@ObjectType()
export class Chat extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => [Message]) 
    @OneToMany(() => Message, message => message.chat)
    messages: Message[];

    @Field(() => Ride)
    @OneToOne(() => Ride, ride => ride.chat)
    ride: Ride;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    rideId: number;

    @Field(() => Int)
    @Column({ nullable: true })
    passengerId: number

    @Field(() => Int)
    @Column({ nullable: true })
    driverId: number

    @Field(() => User) 
    @ManyToOne(() => User, user => user.chatsAsPassenger)
    passenger: User;

    @Field(() => User) 
    @ManyToOne(() => User, user => user.chatsAsDriver)
    driver: User;

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