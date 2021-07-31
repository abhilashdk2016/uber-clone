import { InputType, Field } from "type-graphql";

@InputType()
export class CompletePhoneVerificationInput {
  @Field()
  phone: string;

  @Field()
  key: string;
}