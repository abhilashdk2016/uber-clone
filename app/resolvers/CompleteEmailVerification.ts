import { Resolver, Arg, Mutation, UseMiddleware, Ctx } from "type-graphql";
import { Verification } from "../entities/Verification";
import { ResponseWithToken } from "../responses/ResponseWithToken";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { CompleteEmailVerificationInput } from "../inputs/CompleteEmailVerificationInput";

@Resolver()
export class CompleteEmailVerificationResolver {
    @UseMiddleware(AuthMiddleware)
    @Mutation(_returns => ResponseWithToken)
    async CompleteEmailVerification(@Arg("data") data:CompleteEmailVerificationInput ,@Ctx() ctx: any) {
        const { user } = ctx.req;
        if(user.email) {
            try {
                const verification = await Verification.findOne({ key : data.key, payload: user.email });
                if(verification) {
                    user.verifiedEmail = true;
                    user.save();
                    return {
                        ok: true,
                        error: null
                    }
                } else {
                    return {
                        ok: false,
                        error: "Can't Verifiy Email",
                        token: null
                    }
                }
            } catch (error) {
                return {
                    ok: false,
                    error: error.message,
                    token: null
                };
            }
        } else {
            return {
                ok: false,
                error: "No Email to Verify",
                token: null
            };
        }
    }
}