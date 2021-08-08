// import { PubSubEngine } from "apollo-server-express";
import { User } from "../entities/User";
import { Subscription, Resolver, Root } from "type-graphql";

@Resolver()
export class DriversSubscription {
    @Subscription(() => User, {
        topics: "driverUpdate",
        filter: ({ payload, context }) => { 
            const user: User = context.connection.context.currentUser;
            return (payload.lastLatitude >= user.lastLatitude - 0.05 
                    && payload.lastLatitude <= user.lastLatitude + 0.05 
                    && payload.lastLongitude >= user.lastLongitude - 0.05
                    && payload.lastLongitude <= user.lastLongitude + 0.05
            );
        },
    })
    async driverUpdate(@Root() payload: User): Promise<User> {
        return payload;
    }
}