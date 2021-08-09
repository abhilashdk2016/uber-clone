import { Message } from "../entities/Message";
import { Field, ObjectType } from "type-graphql";
import { Response } from "./Response";

@ObjectType()
export class SendChatResponse extends Response {
    @Field(() => Message, { nullable: true })
    message?: Message | null;
}