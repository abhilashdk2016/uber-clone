import { Arg, Resolver, Mutation, UseMiddleware, Ctx } from "type-graphql";
import { Response } from "../responses/Response";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { User } from "../entities/User";
import { Place } from "../entities/Place";
import { EditPlaceInput } from "../inputs/EditPlaceInput";
import { cleanNullArgs } from "../utils/cleanNullArgs";

@Resolver()
export class EditPlaceResolver {
    @UseMiddleware(AuthMiddleware)
    @Mutation(_returns => Response)
    async EditPlace(@Arg("data") data: EditPlaceInput, @Ctx() ctx: any) {
        const user: User  = ctx.req.user;
        
        try {
            const place = await Place.findOne({id: data.id});
            if(place) {
                if(place.userId === user.id) {
                    const notNullUpdateValues = cleanNullArgs(data, EditPlaceInput) as EditPlaceInput;
                    await Place.update({id: data.id }, { ...notNullUpdateValues });
                    return {
                        ok: true,
                        error: null
                    }
                } else {
                    return {
                        ok: false,
                        error: "You are not authorised to update place"
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