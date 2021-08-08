import { Field, ObjectType } from "type-graphql";
import { Response } from "./Response";
import { User } from "../entities/User";

@ObjectType()
export class GetNearbyDriversResponse extends Response {
    @Field(() => [User], { nullable: true })
    drivers?: [User] | null;
}