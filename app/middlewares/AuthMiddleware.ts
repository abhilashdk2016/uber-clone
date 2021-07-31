import { MiddlewareFn } from "type-graphql";

export const AuthMiddleware: MiddlewareFn<any> = async ({ context: { req } }, next) => {
    if(req.user)
        return await next();
    else 
        throw new Error("Not Authorised!");
  };