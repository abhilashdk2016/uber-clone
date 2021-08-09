import { Resolver, Mutation, Ctx, UseMiddleware } from "type-graphql";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { User } from "../entities/User";
import { Ride } from "../entities/Ride";
import { GetNearByRidesResponse } from "../responses/GetNearByRidesResponse";
import { Between, getRepository } from "typeorm";

@Resolver()
export class NearByRidesResolver {
    @UseMiddleware(AuthMiddleware)
    @Mutation(_returns => GetNearByRidesResponse)
    async NearByRides(@Ctx() ctx: any) {
        const user: User  = ctx.req.user;
        const { lastLatitude, lastLongitude } = user;
        if(user.isDriving) {
            try {
                const ride = await getRepository(Ride).findOne({
                    status: "REQUESTING",
                    pickUpLatitude: Between(lastLatitude - 0.05, lastLatitude + 0.05),
                    pickUpLongitude: Between(lastLongitude - 0.05, lastLongitude + 0.05)
                });
                if(ride) {
                    return {
                        ok: false,
                        error: null,
                        ride
                    }
                }
                return {
                    ok: false,
                    error: null,
                    ride: null
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