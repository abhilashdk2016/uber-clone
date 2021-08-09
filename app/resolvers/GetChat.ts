import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { Resolver, Query, Ctx, UseMiddleware, Arg } from "type-graphql";
import { GetChatResponse } from "../responses/GetChatResponse";
import { GetChatInput } from "../inputs/GetChatInput";
import { Chat } from "../entities/Chat";

@Resolver()
export class GetChatResolver {
    @UseMiddleware(AuthMiddleware)
    @Query(() => GetChatResponse)
    async GetChat(@Arg("data") data: GetChatInput, @Ctx() ctx: any) {
        console.log(ctx);
        const { user } = ctx.req;
        try {
            const chat = await Chat.findOne({ id: data.id}, { relations: ["passenger", "driver", "messages"]});
            if(chat) {
                if(chat.passengerId === user.id || chat.driverId === user.id) {
                    return {
                        ok: true,
                        chat,
                        error: null
                    }
                } else {
                    return {
                        ok: true,
                        chat: null,
                        error: `Not authorised to see this chat`
                    }
                }
            } else {
                return {
                    ok: true,
                    chat: null,
                    error: `CHAT NOT FOUND`
                }
            }
        } catch (error) {
            return {
                ok: true,
                chat: null,
                error: error.message
            }
        }
    }
}