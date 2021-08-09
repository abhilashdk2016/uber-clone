import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { Arg, Resolver, Query, Ctx, UseMiddleware } from "type-graphql";
import { GetRideInput } from "../inputs/GetRideInput";
import { RequestRideResponse } from "../responses/RequestRideResponse";
import { User } from "../entities/User";
import { Ride } from "../entities/Ride";

@Resolver()
export class GetRideeResolver {
    @UseMiddleware(AuthMiddleware)
    @Query(() => RequestRideResponse)
    async GetRide(@Arg("data") data: GetRideInput, @Ctx() ctx: any) {
        const user : User = ctx.req.user;
        try {
            const ride = await Ride.findOne({ id: data.id });
            if(ride) {
                if(ride.passengerId === user.id || ride.driverId === user.id) {
                    return {
                        ok: true,
                        error: null,
                        ride
                    }
                } else {
                    return {
                        ok: false,
                        ride: null,
                        error: `Not Authorised`
                    }
                }
            } else {
                return {
                    ok: false,
                    ride: null,
                    error: `Ride Not Found`
                }
            }
        } catch (error) {
            return {
                ok: false,
                ride: null,
                error: error.message
            }
        }
    }
}