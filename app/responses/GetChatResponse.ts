import { Field, ObjectType } from "type-graphql";
import { Chat } from "../entities/Chat";
import { Response } from "./Response";

@ObjectType()
export class GetChatResponse extends Response {
    @Field(() => Chat, { nullable: true })
    chat?: Chat | null;
}