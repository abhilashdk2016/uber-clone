import { Field, ObjectType } from "type-graphql";
import { Response } from "./Response";
import { Place } from "../entities/Place";

@ObjectType()
export class GetMyPlaceResponse extends Response {
    @Field(() => [Place], { nullable: true })
    places?: [Place] | null;
}