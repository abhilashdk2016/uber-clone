import { Resolver, Arg, Mutation } from "type-graphql";
import { CompletePhoneVerificationInput } from "../inputs/CompletePhoneVerificationInput";
import { Verification } from "../entities/Verification";
import { CompletePhoneVerificationResponse } from "../responses/CompletePhoneVerificationResponse";
import { User } from "../entities/User";
import { createJWT } from "../utils/createJWT";

@Resolver()
export class CompletePhoneVerificationResolver {
    @Mutation(_returns => CompletePhoneVerificationResponse)
    async CompletePhoneVerification(@Arg("data") data: CompletePhoneVerificationInput) {
        try {
            const existingVerification = await Verification.findOne({ payload: data.phone, key: data.key });
            if(existingVerification) {
                existingVerification.remove();
            }
            if(!existingVerification) {
                return {
                    ok: false,
                    error: "Verification Key Not Valid",
                    token: null
                };
            } else {
                existingVerification.verified = true;
                existingVerification.save();
            }
        } catch (error) {
            return {
                ok: false,
                error: error.message,
                token: null
            }
        }

        try {
            const user = await User.findOne({ phoneNumber: data.phone });
            if(user) {
                user.verifiedPoneNumber = true;
                user.save();
                const token = createJWT(user.id);
                return {
                    ok: true,
                    error: null,
                    token
                }
            } else {
                // Phone Number is verified. But no user assigned to it as token is null.
                return {
                    ok: true,
                    error: null,
                    token: null
                };
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