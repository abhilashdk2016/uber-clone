import { InputType, Field } from "type-graphql";

@InputType()
export class EmailSignInInput {
  @Field()
  email: string;

  @Field()
  password: string;
}