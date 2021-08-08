import { InputType, Field, Float } from "type-graphql";

@InputType()
export class AddPlaceInput {
    @Field(() => String, { nullable: true })
    name: string;

    @Field(() => Boolean, { nullable: true })
    isFav: boolean;

    @Field(() => String, { nullable: true })
    address: string;

    @Field(() => Float, { nullable: true })
    latitude: number;

    @Field(() => Float, { nullable: true })
    longitude: number;
}