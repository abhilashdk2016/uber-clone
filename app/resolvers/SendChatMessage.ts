import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { Resolver, Mutation, Ctx, UseMiddleware, Arg, PubSub, PubSubEngine } from "type-graphql";
import { SendChatInput } from "../inputs/SendChatInput";
import { User } from "../entities/User";
import { SendChatResponse } from "../responses/SendChatResponse";
import { Message } from "../entities/Message";
import { Chat } from "../entities/Chat";

@Resolver()
export class SendChatResolver {
    @UseMiddleware(AuthMiddleware)
    @Mutation(() => SendChatResponse)
    async SendChat(@Arg("data") data: SendChatInput, @Ctx() ctx: any, @PubSub() pubSub: PubSubEngine) {
        const user: User  = ctx.req.user;
        try {
            const chat = await Chat.findOne({ id: data.id });
            if(chat && (chat.passengerId === user.id || chat?.driverId === user.id)) {
                const message = await Message.create({
                    text: data.message,
                    chat,
                    user
                }).save();
                pubSub.publish("chatRequest", message);
                return {
                    ok: true,
                    message,
                    error: null
                }
            } else {
                return {
                    ok: true,
                    message: null,
                    error: `CHAT NOT FOUND`
                }
            }
        } catch (error) {
            return {
                ok: true,
                message: null,
                error: error.message
            }
        }
    }
}