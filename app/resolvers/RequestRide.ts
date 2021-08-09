import { Resolver, Arg, Mutation, Ctx, UseMiddleware, PubSub, PubSubEngine } from "type-graphql";
import { RequestRideResponse } from "../responses/RequestRideResponse";
import { RequestRideInput } from "../inputs/RequestRideInput";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { User } from "../entities/User";
import { Ride } from "../entities/Ride";

@Resolver()
export class RequestRideResolver {
    @UseMiddleware(AuthMiddleware)
    @Mutation(_returns => RequestRideResponse)
    async RequestRide(@Arg("data") data: RequestRideInput, @Ctx() ctx: any, @PubSub() pubSub: PubSubEngine) {
        const user: User  = ctx.req.user;
        if(!user.isRiding &&!user.isDriving) {
            try {
                const ride = await Ride.create({ ...data, passenger: user }).save();
                await pubSub.publish("rideRequest", ride);
                user.isRiding = true;
                user.save();
                return {
                    ok: false,
                    error: null,
                    ride
                }
            } catch (error) {
                return {
                    ok: false,
                    error: error.message,
                    ride: null
                }
            }
        } else {
            return {
                ok: false,
                error: "You can't request two rides",
                ride: null
            }
        }
    }
}