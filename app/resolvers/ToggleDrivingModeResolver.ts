import { Resolver, Mutation, UseMiddleware, Ctx } from "type-graphql";
import { Response } from "../responses/Response";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { User } from "../entities/User";

@Resolver()
export class ToggleDrivingModeResolver {
    @UseMiddleware(AuthMiddleware)
    @Mutation(_returns => Response)
    async ToggleDrivingMode(@Ctx() ctx: any) {
        const user: User  = ctx.req.user;
        try {
            user.isDriving = !user.isDriving;
            user.save();
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