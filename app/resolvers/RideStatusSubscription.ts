import { User } from "../entities/User";
import { Subscription, Resolver, Root } from "type-graphql";
import { Ride } from "../entities/Ride";

@Resolver()
export class RideStatusSubscription {
    @Subscription(() => Ride, {
        topics: "rideUpdate",
        filter: ({ payload, context }) => { 
            const user: User = context.connection.context.currentUser;
            console.log(user);
            return (user.id === payload.driverId || user.id === payload.passengerId);
        },
    })
    async rideStatus(@Root() payload: Ride): Promise<Ride> {
        return payload;
    }
}