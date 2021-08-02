import { User } from "../entities/User";
import { Resolver, Arg, Mutation } from "type-graphql";
import { EmailSignUpInput } from "../inputs/EmailSignUpInput";
import { EmailSignUpResponse } from "../responses/EmailSignUpResponse";
import { createJWT } from "../utils/createJWT";
import { Verification } from "../entities/Verification";
import { sendVerificationEmail } from "../utils/sendEmail";

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
                const phoneVerification = await Verification.findOne({ payload: data.phoneNumber, verified: true });
                if(phoneVerification){
                    const newUser = await User.create({ ...data }).save();
                    console.log(`newUser: ${newUser}`);
                    if(newUser.email) {
                        const emailVerification = await Verification.create({
                            payload: newUser.email,
                            target: "EMAIL"
                        }).save();
                        await sendVerificationEmail(newUser.fullName, emailVerification.key);
                    }
                    const token = createJWT(newUser.id);
                    return {
                        ok: true,
                        error: null,
                        token
                    }
                } else {
                    return {
                        ok: false,
                        error: "You haven't Verified Yuor Phone Number",
                        token: null
                    }
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