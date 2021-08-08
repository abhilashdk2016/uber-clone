import { InputType, Field } from "type-graphql";

@InputType()
export class UpdateProfileInput {
  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  password?: string;

  @Field({ nullable: true })
  profilePhoto?: string;

  @Field({ nullable: true })
  age?: number;
}