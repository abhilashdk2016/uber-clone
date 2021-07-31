import { User } from "../entities/User";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class GetMyProfileResponse {
    @Field(() => Boolean)
    ok: boolean;
    @Field(() => String, { nullable: true })
    error?: String | null;
    @Field(() => User, { nullable: true })
    user?: User | null;
}