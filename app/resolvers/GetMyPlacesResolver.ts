import { Resolver, Query, UseMiddleware, Ctx } from "type-graphql";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { User } from "../entities/User";
import { GetMyPlaceResponse } from "../responses/GetMyPlaceResponse";

@Resolver()
export class GetMyPlacesResolver {
    @UseMiddleware(AuthMiddleware)
    @Query(_returns => GetMyPlaceResponse)
    async GetMyPlaces(@Ctx() ctx: any) {
        const user: User | undefined  = await User.findOne({id: ctx.req.user.id}, { relations: ["places"] });
        if(user && user.places) {
            return {
                ok: true,
                places: user.places,
                error: null
            }
        } else {
            return {
                ok: false,
                places: null,
                error: "Unable to find places for this user"
            }
        }
    }
}