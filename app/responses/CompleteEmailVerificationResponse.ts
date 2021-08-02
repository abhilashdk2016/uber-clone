import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class CompleteEmailVerificationResponse {
    @Field(() => Boolean)
    ok: boolean;
    @Field(() => String, { nullable: true })
    error?: String | null;
    @Field(() => String, { nullable: true })
    token: String
}