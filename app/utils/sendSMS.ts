import { Twilio } from "twilio";


const twilioClient = new Twilio(process.env.TWILIO_SID!, process.env.TWILIO_TOKEN!);

export const sendSMS = (to: string, body: string) => {
    return twilioClient.messages.create({
        from: process.env.TWILIO_PHONE!,
        to: to,
        body: body
    });
};

export const sendVerificationSMS = (to: string, key: string) => sendSMS(to, `Your verification key is: ${key}`);