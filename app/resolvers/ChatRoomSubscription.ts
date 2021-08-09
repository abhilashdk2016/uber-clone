// import { PubSubEngine } from "apollo-server-express";
import { User } from "../entities/User";
import { Subscription, Resolver, Root } from "type-graphql";
import { Message } from "../entities/Message";
import { Chat } from "../entities/Chat";

@Resolver()
export class ChatRoomSubscription {
    @Subscription(() => Message, {
        topics: "chatRequest",
        filter: async ({ payload, context }) => { 
            const user: User = context.connection.context.currentUser;
            try {
                const chat = await Chat.findOne({ id: payload.chatId});
                if(chat) {
                    return chat.driverId === user.id || chat.passengerId === user.id;
                } else {
                    return false;
                }
            } catch (error) {
                return false;
            }
        },
    })
    async chatRoom(@Root() payload: Message): Promise<Message> {
        return payload;
    }
}