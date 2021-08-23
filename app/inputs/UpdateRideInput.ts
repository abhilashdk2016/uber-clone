// import { rideStatus } from '../types';
import { InputType, Field, ID } from "type-graphql";

@InputType()
export class UpdateRideInput {
    @Field(() => String, { nullable: true })
    status: String;

    @Field(() => ID)
    id: number;
}