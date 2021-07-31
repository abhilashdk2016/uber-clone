import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ObjectType, Field, ID, Float} from 'type-graphql';
import { rideStatus } from "../types";
import { User } from "./User";

@Entity()
@ObjectType()
export class Ride extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    @Column({ type: "text", enum: ["ACCEPTED" , "FINISHED" , "CANCELED" , "REQUESTING" , "ONROUTE"]})
    status: rideStatus;

    @Field(() => String) 
    @Column({ type: "text"})
    duration: string;

    @Field(() => String) 
    @Column({ type: "text"})
    distance: string;

    @Field(() => String) 
    @Column({ type: "text"})
    pickUpAddress: string;

    @Field(() => String) 
    @Column({ type: "text"})
    dropOffAddress: string;

    @Field(() => Float)
    @Column({ type: "double precision", default: 0})
    pickUpLatitude: number;

    @Field(() => Float)
    @Column({ type: "double precision", default: 0})
    pickUpLongitude: number;

    @Field(() => Float)
    @Column({ type: "double precision", default: 0})
    dropOffLatitude: number;

    @Field(() => Float)
    @Column({ type: "double precision", default: 0})
    dropOffLongitude: number;

    @Field(() => Float)
    @Column({ type: "double precision", default: 0})
    price: number;

    @Field(() => User)
    @ManyToOne(() => User, user => user.ridesAsPassenger)
    driver: User;

    @Field(() => User)
    @ManyToOne(() => User, user => user.ridesAsDriver)
    passenger: User;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: string;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: string;
}