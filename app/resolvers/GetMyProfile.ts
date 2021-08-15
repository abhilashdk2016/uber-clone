import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { Resolver, Query, Ctx, UseMiddleware } from "type-graphql";
import { GetMyProfileResponse } from "../responses/GetMyProfileResponse";

@Resolver()
export class GetMyProfileResolver {
    @UseMiddleware(AuthMiddleware)
    @Query(() => GetMyProfileResponse)
    async GetMyProfile(@Ctx() ctx: any) {
        const { user } = ctx.req;
        return {
            ok: true,
            user,
            error: null
        }
    }
}