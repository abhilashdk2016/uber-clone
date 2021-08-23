import { Resolver, Arg, Mutation, UseMiddleware } from "type-graphql";
import { Verification } from "../entities/Verification";
import { ResponseWithToken } from "../responses/ResponseWithToken";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";
import { CompleteEmailVerificationInput } from "../inputs/CompleteEmailVerificationInput";
import { createJWT } from "../utils/createJWT";
import { User } from "../entities/User";

@Resolver()
export class CompleteEmailVerificationResolver {
    @UseMiddleware(AuthMiddleware)
    @Mutation(_returns => ResponseWithToken)
    async CompleteEmailVerification(@Arg("data") data:CompleteEmailVerificationInput) {
        try {
            const verification = await Verification.findOne({ key : data.key, payload: data.email });
            if(verification) {
                const user = await User.findOne({ email: data.email })
                if(user) {
                    user.verifiedEmail = true;
                    user.verifiedPhoneNumber = true;
                    const token = createJWT(user.id);
                    user.save();
                    return {
                        ok: true,
                        error: null,
                        token
                    }
                } else {
                    return {
                        ok: false,
                        error: "No User found with this email",
                        token: null
                    }
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
    }
}