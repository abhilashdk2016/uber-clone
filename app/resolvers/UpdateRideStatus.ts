import { Resolver, Arg, Mutation, Ctx, UseMiddleware, PubSub, PubSubEngine } from "type-graphql";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { User } from "../entities/User";
import { Ride } from "../entities/Ride";
import { UpdateRideInput } from "../inputs/UpdateRideInput";
import { Chat } from "../entities/Chat";
import { UpdateRideResponse } from "../responses/UpdateRideResponse";

@Resolver()
export class UpdateRideResolver {
    @UseMiddleware(AuthMiddleware)
    @Mutation(_returns => UpdateRideResponse)
    async UpdateRide(@Arg("data") data: UpdateRideInput, @Ctx() ctx: any, @PubSub() pubSub: PubSubEngine) {
        const user: User  = ctx.req.user;
        if(user.isDriving) {
            try {
                let ride : Ride | undefined;
                if(data.status === "ACCEPTED") {
                    ride = await Ride.findOne({ id: data.id, status: "REQUESTING" }, { relations: ["passenger", "driver"]});
                    if(ride) {
                        ride.driver = user;
                        user.isTaken = true;
                        user.save();
                        const chat = await Chat.create({
                            driver: user,
                            passenger: ride.passenger,
                            pickUpAddress: ride.pickUpAddress
                        }).save();
                        ride.chat = chat;
                        ride.save();
                    }
                } else {
                    ride = await Ride.findOne({
                        id: data.id,
                        driver: user
                    }, { relations: ["passenger", "driver"]});
                }
                if(ride) {
                    ride.status = data.status;
                    if(data.status === "FINISHED") {
                        user.isTaken = false;
                        let passenger = await User.findOne({ id: ride.passenger.id});
                        if(passenger) {
                            passenger.isRiding = false;
                            passenger.save();
                        }
                        user.save();
                    }
                    ride.save();
                    pubSub.publish("rideUpdate", ride);
                    return {
                        ok: true,
                        error: null,
                        ride
                    }
                } else {
                    return {
                        ok: false,
                        error: `Can't update ride`,
                        ride: null
                    }
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
                error: "You are not a driver",
                ride: null
            }
        }
    }
}