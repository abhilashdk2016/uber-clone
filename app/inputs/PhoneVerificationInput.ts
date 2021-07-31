import { InputType, Field } from "type-graphql";

@InputType()
export class PhoneVerificationInput {
  @Field()
  phone: string;
}