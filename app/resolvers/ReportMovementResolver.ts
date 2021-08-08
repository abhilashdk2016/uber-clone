import { Arg, Resolver, Mutation, UseMiddleware, Ctx, PubSub, PubSubEngine } from "type-graphql";
import { Response } from "../responses/Response";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { User } from "../entities/User";
import { ReportMovementInput } from "../inputs/ReportMovementInput";
import { cleanNullArgs } from "../utils/cleanNullArgs";

@Resolver()
export class ReportMovementResolver {
    @UseMiddleware(AuthMiddleware)
    @Mutation(_returns => Response)
    async ReportMovement(@Arg("data") data: ReportMovementInput, @Ctx() ctx: any, @PubSub() pubSub: PubSubEngine) {
        const user: User  = ctx.req.user;
        const notNullUpdateValues = cleanNullArgs(data, ReportMovementInput) as ReportMovementInput;
        try {
            await User.update({id: user.id }, { ...notNullUpdateValues });
            const updatedUser = await User.findOne({id: user.id});
            await pubSub.publish("driverUpdate", updatedUser);
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