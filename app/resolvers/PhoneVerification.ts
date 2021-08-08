import { Resolver, Arg, Mutation } from "type-graphql";
import { Response } from "../responses/Response";
import { PhoneVerificationInput } from "../inputs/PhoneVerificationInput";
import { Verification } from "../entities/Verification";
import { sendVerificationSMS } from "../utils/sendSMS";

@Resolver()
export class PhoneVerificationResolver {
    @Mutation(_returns => Response)
    async PhoneVerification(@Arg("data") data: PhoneVerificationInput) {
        try {
            const existingVerification = await Verification.findOne({ payload: data.phone });
            if(existingVerification) {
                existingVerification.remove();
            }
            const newVerification = await Verification.create({
                payload: data.phone,
                target: "PHONE"
            }).save();
            await sendVerificationSMS(newVerification.payload, newVerification.key);
            return {
                ok: true,
                error: null
            };
        } catch (error) {
            return {
                ok: false,
                error: error.message
            }
        }
    }
}