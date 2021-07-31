import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ObjectType, Field, ID} from 'type-graphql';
import { verificationTarget } from "../types";
import { User } from "./User";

const PHONE = "PHONE";
const EMAIL = "EMAIL";

@Entity()
@ObjectType()
export class Verification extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    @Column({ type: "text", enum: [PHONE, EMAIL]})
    target: verificationTarget;

    @Field(() => Boolean)
    @Column({ type: "boolean", default: false })
    used: boolean;

    @Field(() => String) 
    @Column({ type: "text"})
    payload: string;

    @Field(() => String)
    @Column({ type: "text"})
    key: string;

    @Field(() => User) 
    @ManyToOne(() => User, user => user.verifications)
    user: User;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: string;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: string;

    @BeforeInsert()
    createKey(): void {
        if(this.target === PHONE) {
            this.key = Math.floor(Math.random() * 100000).toString();
        } else if(this.target === EMAIL) {
            this.key = Math.random().toString(36).substr(2);
        }
    }

}