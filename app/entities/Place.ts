import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ObjectType, Field, ID, Float} from 'type-graphql';
import { User } from "./User";

@Entity()
@ObjectType()
export class Place extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    @Column({ type: "text"})
    name: string;

    @Field(() => Boolean)
    @Column({ type: "boolean", default: false })
    isFav: boolean;

    @Field(() => String) 
    @Column({ type: "text"})
    address: string;

    @Field(() => Float)
    @Column({ type: "double precision", default: 0})
    latitude: number;

    @Field(() => Float)
    @Column({ type: "double precision", default: 0})
    longitude: number;

    @Column({ type: "int", nullable: true})
    userId: number;

    @Field(() => User)
    @ManyToOne(() => User, user => user.places)
    user: User;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: string;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: string;
}