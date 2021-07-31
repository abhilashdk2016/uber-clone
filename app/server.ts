import { ApolloServer } from "apollo-server-express";
import Express, { NextFunction } from "express";
import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import connectionOptions from "./ormConfig";

// resolvers
import { UserResolver} from "./resolvers/User";
import { PhoneVerificationResolver } from './resolvers/PhoneVerification';
import { CompletePhoneVerificationResolver } from "./resolvers/CompletePhoneVerification";
import { EmailSignUpResolver } from "./resolvers/EmailSignUp";
import { decodeJWT } from "./utils/decodeJWT";
import { GetMyProfileResolver } from "./resolvers/GetMyProfile";

const main = async () => {

    const jwt = async(req: any, _res: any, next: NextFunction) => {
        const token = req.get("X-JWT");
        if(token) {
            const user = await decodeJWT(token);
            if(user) {
                req.user = user;
            } else {
                req.user = undefined;
            }
        }
        next();
    }

    const schema = await buildSchema({
        resolvers: [ UserResolver, PhoneVerificationResolver, CompletePhoneVerificationResolver, EmailSignUpResolver, GetMyProfileResolver ],
        authChecker: ({ context: { req } }) => {
            if(req.user)
                return true;
            else 
                return false
        },
        emitSchemaFile: true,
        validate: false,

    });
    const server = new ApolloServer({ schema, context: req => {
        return {
            req: req.req
        }
    } });
    const app = Express();
    app.use(jwt);
    server.applyMiddleware({ app });
    createConnection(connectionOptions).then(() => {
        app.listen({ port: 4000 }, () => console.log(`🚀 Server ready and listening at ==> http://localhost:4000${server.graphqlPath}`))
    }).catch(e => console.log(e));
}
main().catch((error)=> {
    console.log(error, 'error');
});
