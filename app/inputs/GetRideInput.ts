import { InputType, Field, ID } from "type-graphql";

@InputType()
export class GetRideInput {
    @Field(() => ID)
    id: number;
}