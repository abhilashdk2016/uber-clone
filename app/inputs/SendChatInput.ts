import { InputType, Field, ID } from "type-graphql";

@InputType()
export class SendChatInput {
  @Field(() => String)
  message: string;

  @Field(() => ID)
  id: number;
}