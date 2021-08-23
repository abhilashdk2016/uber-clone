import { Field, ObjectType } from "type-graphql";
import { Response } from "./Response";
import { Ride } from "../entities/Ride";

@ObjectType()
export class UpdateRideResponse extends Response {
    @Field(() => Ride, { nullable: true })
    ride?: Ride | null;
}