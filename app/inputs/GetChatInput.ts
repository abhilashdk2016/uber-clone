import { InputType, Field, ID } from "type-graphql";

@InputType()
export class GetChatInput {
    @Field(() => ID)
    id: number;
}