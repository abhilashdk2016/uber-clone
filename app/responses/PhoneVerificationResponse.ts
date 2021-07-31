import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class PhoneVerificationResponse {
    @Field(() => Boolean)
    ok: boolean;
    @Field(() => String, { nullable: true })
    error?: String | null;
}