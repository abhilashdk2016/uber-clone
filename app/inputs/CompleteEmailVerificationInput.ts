import { InputType, Field } from "type-graphql";

@InputType()
export class CompleteEmailVerificationInput {
  @Field()
  key: string;
}