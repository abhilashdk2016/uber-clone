import { InputType, Field, ID } from "type-graphql";

@InputType()
export class EditPlaceInput {
    @Field(() => String, { nullable: true })
    name: string;

    @Field(() => Boolean, { nullable: true })
    isFav: boolean;

    @Field(() => ID)
    id: number;
}