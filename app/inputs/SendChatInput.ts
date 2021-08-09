import { InputType, Field } from "type-graphql";

@InputType()
export class SendChatInput {
  @Field()
  message: string;

  @Field()
  id: number;
}