import { User } from "../entities/User";
import {Field, ObjectType} from "type-graphql";


@ObjectType()
export class SubscriptionResponse {
    @Field()
    user?: User;
}