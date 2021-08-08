import { Arg, Resolver, Mutation, UseMiddleware, Ctx } from "type-graphql";
import { Response } from "../responses/Response";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { User } from "../entities/User";
import { AddPlaceInput } from "../inputs/AddPlaceInput";
import { Place } from "../entities/Place";

@Resolver()
export class AddPlaceResolver {
    @UseMiddleware(AuthMiddleware)
    @Mutation(_returns => Response)
    async AddPlace(@Arg("data") data: AddPlaceInput, @Ctx() ctx: any) {
        const user: User  = ctx.req.user;
        try {
            await Place.create({...data, user}).save();
            return {
                ok: true,
                error: null
            }
        } catch(e) {
            return {
                ok: false,
                error: e.message
            }
        }
    }
}