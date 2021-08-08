import { InputType, Field, Float } from "type-graphql";

@InputType()
export class ReportMovementInput {
  @Field(() => Float, { nullable: true })
  lastOrientation: number;

  @Field(() => Float, { nullable: true })
  lastLatitude: number;

  @Field(() => Float, { nullable: true })
  lastLongitude: number;
}