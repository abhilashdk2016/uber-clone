import { Arg, Resolver, Mutation, UseMiddleware, Ctx } from "type-graphql";
import { Response } from "../responses/Response";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { User } from "../entities/User";
import { Place } from "../entities/Place";
import { EditPlaceInput } from "../inputs/EditPlaceInput";

@Resolver()
export class DeletePlaceResolver {
    @UseMiddleware(AuthMiddleware)
    @Mutation(_returns => Response)
    async DeletePlace(@Arg("data") data: EditPlaceInput, @Ctx() ctx: any) {
        const user: User  = ctx.req.user;
        
        try {
            const place = await Place.findOne({id: data.id});
            if(place) {
                if(place.userId === user.id) {
                    await place.remove();
                    return {
                        ok: true,
                        error: null
                    }
                } else {
                    return {
                        ok: false,
                        error: "You are not authorised to delete place"
                    }
                }
            } else {
                return {
                    ok: false,
                    error: "Place not Found"
                }
            }
        } catch(e) {
            return {
                ok: false,
                error: e.message
            }
        }
    }
}