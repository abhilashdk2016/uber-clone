import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { Resolver, Query, Ctx, UseMiddleware } from "type-graphql";
import { RequestEmailVerificationResponse } from "../responses/RequestEmailVerificationResponse";
import { Verification } from "../entities/Verification";
import { sendVerificationEmail } from "../utils/sendEmail";

@Resolver()
export class RequestEmailVerificationResolver {
    @UseMiddleware(AuthMiddleware)
    @Query(() => RequestEmailVerificationResponse)
    async RequestEmailVerification(@Ctx() ctx: any) {
        const { user } = ctx.req;
        if(user.email && !user.verifiedEmail) {
            try {
                const oldVerification = await Verification.findOne({ payload: user.email });
                if(oldVerification) {
                    oldVerification.remove();
                }
                const newVerification = await Verification.create({
                    payload: user.email,
                    target: "EMAIL"
                }).save();
                await sendVerificationEmail(user.fullName, newVerification.key);
                return {
                    ok: true,
                    error: null
                }
            } catch (error) {
                return {
                    ok: false,
                    error: error.message
                }
            }
        } else {
            return {
                ok: false,
                error: "User Not Found"
            }
        }
    }
}