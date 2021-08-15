import { Resolver, Arg, Mutation, UseMiddleware, Ctx } from "type-graphql";
import { UpdateProfileInput } from "../inputs/UpdateProfileInput";
import { Response } from "../responses/Response";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { User } from "../entities/User";
import { cleanNullArgs } from "../utils/cleanNullArgs";
import { getConnection } from "typeorm";

@Resolver()
export class UpdateProfileResolver {
    @UseMiddleware(AuthMiddleware)
    @Mutation(_returns => Response)
    async UpdateProfile(@Arg("data") data: UpdateProfileInput, @Ctx() ctx: any) {
        const user: User  = ctx.req.user;
        const notNullUpdateValues = cleanNullArgs(data, UpdateProfileInput) as UpdateProfileInput;
        try {
            if(data.password !== null) {
                user.password = data.password!;
                user.save();
            }
            //await User.update({id: user.id }, { ...notNullUpdateValues });
            await getConnection()
                .createQueryBuilder()
                .update(User)
                .set({ ...notNullUpdateValues })
                .where("id = :id", { id: user.id})
                .execute();
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