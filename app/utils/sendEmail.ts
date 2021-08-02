import Mailgun from "mailgun-js";

const mailGunClient = new Mailgun({
    apiKey: process.env.MAILGUN_API!,
    domain: process.env.SANDBOX_DOMAIN!
});

const sendEmail = (subject: string, body: string) => {
    const emailData = {
        from: "abhilashdk2018@outlook.com",
        to: "abhilashdk2018@outlook.com",
        subject,
        html: body
    };
    return mailGunClient.messages().send(emailData);
};

export const sendVerificationEmail = (fullName: string, key: string) => {
    const emailSubject = `Hello! ${fullName}, please verify your email`;
    const emailBody = `Your Email Verification Id is : ${key}`;
    return sendEmail(emailSubject, emailBody);
} 