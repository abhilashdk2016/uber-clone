import { InputType, Field } from "type-graphql";

@InputType()
export class EmailSignUpInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  profilePhoto: string;

  @Field()
  age: number;

  @Field()
  phoneNumber: string;
}