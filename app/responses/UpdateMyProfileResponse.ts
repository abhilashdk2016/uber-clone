import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class UpdateMyProfileResponse {
    @Field(() => Boolean)
    ok: boolean;
    @Field(() => String, { nullable: true })
    error?: String | null;
}