import { InputType, Field } from "type-graphql";

@InputType()
export class FaceBookConnectInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  fbId: string;
}