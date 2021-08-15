import bcrypt from 'bcrypt';
import { IsEmail  } from 'class-validator';
import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ObjectType, Field, ID, Float, Int } from 'type-graphql';
import { Chat } from './Chat';
import { Message } from './Message';
import { Ride } from './Ride';
import { Place } from './Place';

@Entity()
@ObjectType()
export class User extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number

    @Field(() => String)
    @Column({ type: "text", unique: true, nullable: true })
    @IsEmail()
    email: string | null;

    @Field(() => Boolean)
    @Column({ type: "boolean", default: false })
    verifiedEmail: boolean

    @Field(() => String)
    @Column({ type: "text"})
    firstName: string

    @Field(() => String)
    @Column({ type: "text"})
    lastName: string

    @Field(() => Int)
    @Column({ type: "int", nullable: true})
    age: number

    @Field(() => String)
    @Column({ type: "text", nullable: true})
    password: string

    @Field(() => String)
    @Column({ type: "text", nullable: true})
    phoneNumber: string;

    @Field(() => Boolean)
    @Column({ type: "boolean", default: false })
    verifiedPoneNumber: boolean

    @Field(() => String)
    @Column({ type: "text"})
    profilePhoto: string;

    @Field(() => String)
    @Column({ type: "text", nullable: true})
    fbId: string;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: string;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: string;

    get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }

    @Field(() => Boolean)
    @Column({ type: "boolean", default: false })
    isDriving: boolean

    @Field(() => Boolean)
    @Column({ type: "boolean", default: false })
    isRiding: boolean

    @Field(() => Boolean)
    @Column({ type: "boolean", default: false })
    isTaken: boolean

    @Field(() => Float)
    @Column({ type: "double precision", default: 0})
    lastLongitude: number;

    @Field(() => Float)
    @Column({ type: "double precision", default: 0})
    lastLatitude: number;

    @Field(() => Float)
    @Column({ type: "double precision", default: 0})
    lastOrientation: number;

    @Field(() => [Chat])
    @OneToMany(() => Chat, chat => chat.passenger)
    chatsAsPassenger: [Chat];

    @Field(() => [Chat])
    @OneToMany(() => Chat, chat => chat.driver)
    chatsAsDriver: [Chat];

    @Field(() => [Message]) 
    @OneToMany(() => Message, message => message.user)
    messages: Message[];

    @Field(() => [Ride]) 
    @OneToMany(() => Ride, ride => ride.passenger)
    ridesAsPassenger: Ride[];

    @Field(() => [Ride]) 
    @OneToMany(() => Ride, ride => ride.driver)
    ridesAsDriver: Ride[];

    @Field(() => [Place]) 
    @OneToMany(() => Place, place => place.user)
    places: Place[];

    private hashPassword(password: string) : Promise<string> {
        return bcrypt.hash(password, 10);
    }

    @BeforeInsert()
    //@BeforeUpdate()
    async savePassword() : Promise<void> {
        if(this.password.length > 0) {
            this.password = await this.hashPassword(this.password);
        }
    }

    public comparePasswords(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }
}