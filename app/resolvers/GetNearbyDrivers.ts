import { Resolver, Query, UseMiddleware, Ctx } from "type-graphql";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { User } from "../entities/User";
import { GetNearbyDriversResponse } from "../responses/GetNearbyDriversResponse";
import { Between, getRepository } from "typeorm";

@Resolver()
export class GetNearbyDriversResolver {
    @UseMiddleware(AuthMiddleware)
    @Query(_returns => GetNearbyDriversResponse)
    async GetNearbyDrivers(@Ctx() ctx: any) {
        const user: User  = ctx.req.user;
        try {
            const drivers = await getRepository(User).find({
                isDriving: true,
                lastLatitude: Between(user.lastLatitude - 0.05, user.lastLatitude + 0.05),
                lastLongitude: Between(user.lastLongitude - 0.05, user.lastLongitude + 0.05)
            });
            return {
                ok: true,
                error: false,
                drivers
            }
        } catch(e) {
            return {
                ok: false,
                error: e.message,
                drivers: null
            }
        }
    }
}