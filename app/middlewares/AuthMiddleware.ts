import { decodeJWT } from "../utils/decodeJWT";
import { MiddlewareFn } from "type-graphql";

export const AuthMiddleware: MiddlewareFn<any> = async ({ context: { req } }, next) => {
    const token = req.get("X-JWT");
        if(token) {
            const user = await decodeJWT(token);
            if(user) {
                req.user = user;
            } else {
                req.user = undefined;
            }
        }
        await next();
  };