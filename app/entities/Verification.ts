import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ObjectType, Field, ID} from 'type-graphql';
import { verificationTarget } from "../types";

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

    @Field(() => String) 
    @Column({ type: "text"})
    payload: string;

    @Field(() => String)
    @Column({ type: "text"})
    key: string;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: string;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: string;

    @Field(() => Boolean)
    @Column({ type: "boolean", default: "false"})
    verified: boolean;

    @BeforeInsert()
    createKey(): void {
        if(this.target === PHONE) {
            this.key = Math.floor(Math.random() * 100000).toString();
        } else if(this.target === EMAIL) {
            this.key = Math.random().toString(36).substr(2);
        }
    }

}