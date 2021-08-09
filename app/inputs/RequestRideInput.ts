import { InputType, Field, Float } from "type-graphql";

@InputType()
export class RequestRideInput {
    @Field(() => String)
    duration: string;

    @Field(() => String)
    distance: string;

    @Field(() => String)
    pickUpAddress: string;

    @Field(() => String)
    dropOffAddress: string;

    @Field(() => Float)
    pickUpLatitude: number;

    @Field(() => Float)
    pickUpLongitude: number;

    @Field(() => Float)
    dropOffLatitude: number;

    @Field(() => Float)
    dropOffLongitude: number;

    @Field(() => Float)
    price: number;
}