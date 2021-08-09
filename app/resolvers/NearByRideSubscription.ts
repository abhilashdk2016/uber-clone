// import { PubSubEngine } from "apollo-server-express";
import { User } from "../entities/User";
import { Subscription, Resolver, Root } from "type-graphql";
import { Ride } from "../entities/Ride";

@Resolver()
export class NearByRideSubscription {
    @Subscription(() => Ride, {
        topics: "rideRequest",
        filter: ({ payload, context }) => { 
            const user: User = context.connection.context.currentUser;
            return (payload.pickUpLatitude >= user.lastLatitude - 0.05 
                    && payload.pickUpLatitude <= user.lastLatitude + 0.05 
                    && payload.pickUpLongitude >= user.lastLongitude - 0.05
                    && payload.pickUpLongitude <= user.lastLongitude + 0.05
            );
        },
    })
    async nearByRide(@Root() payload: Ride): Promise<Ride> {
        return payload;
    }
}