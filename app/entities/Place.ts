import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ObjectType, Field, ID, Float} from 'type-graphql';

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

    @Field(() => String)
    @CreateDateColumn()
    createdAt: string;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: string;
}