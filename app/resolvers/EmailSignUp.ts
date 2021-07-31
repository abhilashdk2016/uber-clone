import { User } from "../entities/User";
import { Resolver, Arg, Mutation } from "type-graphql";
import { EmailSignUpInput } from "../inputs/EmailSignUpInput";
import { EmailSignUpResponse } from "../responses/EmailSignUpResponse";
import { createJWT } from "../utils/createJWT";

@Resolver()
export class EmailSignUpResolver {
    @Mutation(_returns => EmailSignUpResponse)
    async EmailSignUp(@Arg("data") data: EmailSignUpInput) {
        try {
            const existingUser = await User.findOne({ email: data.email });
            if(existingUser) {
                return {
                    ok: false,
                    error: "You should login",
                    token: null
                }
            } else {
                const newUser = await User.create({ ...data }).save();
                const token = createJWT(newUser.id);
                return {
                    ok: true,
                    error: null,
                    token
                }
            }
        } catch (error) {
            return {
                ok: false,
                error: error.message,
                token: null
            }
        }
    }
}