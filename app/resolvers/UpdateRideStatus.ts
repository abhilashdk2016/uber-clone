import { Resolver, Arg, Mutation, Ctx, UseMiddleware, PubSub, PubSubEngine } from "type-graphql";
import { Response } from "../responses/Response";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { User } from "../entities/User";
import { Ride } from "../entities/Ride";
import { UpdateRideInput } from "../inputs/UpdateRideInput";
import { Chat } from "../entities/Chat";

@Resolver()
export class UpdateRideResolver {
    @UseMiddleware(AuthMiddleware)
    @Mutation(_returns => Response)
    async UpdateRide(@Arg("data") data: UpdateRideInput, @Ctx() ctx: any, @PubSub() pubSub: PubSubEngine) {
        const user: User  = ctx.req.user;
        if(!user.isDriving) {
            try {
                let ride : Ride | undefined;
                if(data.status === "ACCEPTED") {
                    ride = await Ride.findOne({ id: data.id, status: "REQUESTING" }, { relations: ["passenger"]});
                    if(ride) {
                        ride.driver = user;
                        user.isTaken = true;
                        user.save();
                        const chat = await Chat.create({
                            driver: user,
                            passenger: ride.passenger
                        }).save();
                        ride.chat = chat;
                        ride.save();
                    }
                } else {
                    ride = await Ride.findOne({
                        id: data.id,
                        driver: user
                    });
                }
                if(ride) {
                    ride.status = data.status;
                    ride.save();
                    pubSub.publish("rideUpdate", ride);
                    return {
                        ok: true,
                        error: null,
                    }
                } else {
                    return {
                        ok: false,
                        error: `Can't update ride`,
                    }
                }
            } catch (error) {
                return {
                    ok: false,
                    error: error.message,
                }
            }
        } else {
            return {
                ok: false,
                error: "You are not a driver",
            }
        }
    }
}