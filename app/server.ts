import { ApolloServer } from "apollo-server-express";
import Express from "express";
import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import connectionOptions from "./ormConfig";
import { createServer } from 'http';
import cors from 'cors';

// resolvers
import { UserResolver} from "./resolvers/User";
import { PhoneVerificationResolver } from './resolvers/PhoneVerification';
import { CompletePhoneVerificationResolver } from "./resolvers/CompletePhoneVerification";
import { EmailSignUpResolver } from "./resolvers/EmailSignUp";
import { decodeJWT } from "./utils/decodeJWT";
// import { SubscriptionServer } from 'subscriptions-transport-ws';
// import { execute, subscribe } from 'graphql';
import { GetMyProfileResolver } from "./resolvers/GetMyProfile";
import { RequestEmailVerificationResolver } from "./resolvers/RequestEmailVerification";
import { CompleteEmailVerificationResolver } from "./resolvers/CompleteEmailVerification";
import { UpdateProfileResolver } from "./resolvers/UpdateMyProfileResolver";
import { ToggleDrivingModeResolver } from "./resolvers/ToggleDrivingModeResolver";
import { ReportMovementResolver } from "./resolvers/ReportMovementResolver";
import { AddPlaceResolver } from "./resolvers/AddPlaceResolver";
import { EditPlaceResolver } from "./resolvers/EditPlaceResolver";
import { DeletePlaceResolver } from "./resolvers/DeletePlaceResolver";
import { GetMyPlacesResolver } from "./resolvers/GetMyPlacesResolver";
import { DriversSubscription } from "./resolvers/DriversSubscription";
import { NearByRidesResolver } from "./resolvers/GetNearByRide";
import { NearByRideSubscription } from "./resolvers/NearByRideSubscription";
import { SendChatResolver } from "./resolvers/SendChatMessage";
import { GetChatResolver } from "./resolvers/GetChat";
import { GetNearbyDriversResolver } from "./resolvers/GetNearbyDrivers";
import { RequestRideResolver } from "./resolvers/RequestRide";
import { RideStatusSubscription } from "./resolvers/RideStatusSubscription";
import { UpdateRideResolver } from "./resolvers/UpdateRideStatus";
import { GetRideeResolver } from "./resolvers/GetRide";
import { ChatRoomSubscription } from "./resolvers/ChatRoomSubscription";

const main = async () => {

    const schema = await buildSchema({
        resolvers: [ UserResolver, 
            PhoneVerificationResolver, 
            CompletePhoneVerificationResolver, 
            EmailSignUpResolver, 
            GetMyProfileResolver, 
            RequestEmailVerificationResolver,
            CompleteEmailVerificationResolver,
            UpdateProfileResolver,
            ToggleDrivingModeResolver,
            ReportMovementResolver,
            AddPlaceResolver,
            EditPlaceResolver,
            DeletePlaceResolver,
            GetMyPlacesResolver,
            DriversSubscription,
            NearByRidesResolver,
            NearByRideSubscription,
            SendChatResolver,
            GetChatResolver,
            GetNearbyDriversResolver,
            RequestRideResolver,
            RideStatusSubscription,
            UpdateRideResolver,
            GetRideeResolver,
            ChatRoomSubscription,
            SendChatResolver
         ],
        authChecker: ({ context: { req } }) => {
            if(req.user)
                return true;
            else 
                return false
        },
        emitSchemaFile: true,
        validate: false,

    });
    const server = new ApolloServer({ schema, context: (ctx) => {
        // console.log('Context in AP Server');
        // console.log(ctx);
                return {
                    req: ctx.req,
                    connection: ctx.connection
                }
        },
        subscriptions: {
            path: "/subscriptions",
            onConnect: async (connectionParams: any) => {
                const token = connectionParams["X-JWT"];
                if(token) {
                    const user = await decodeJWT(token);
                    if(user) {
                        return {
                            currentUser: user
                        }
                    }
                }
                throw new Error("Not Authorised to Subscribe...");
            },
            onDisconnect: () => {
                console.log("Client disconnected from subscriptions");
            }
        } 
    }); 
    const app = Express();
    app.use(cors());
    const ws = createServer( app );
    await server.start();
    server.applyMiddleware({ app });
    // SubscriptionServer.create(
    //     { schema, execute, subscribe,
    //         onConnect: async (connectionParams: any) => {
    //                     const token = connectionParams["X-JWT"];
    //                     if(token) {
    //                         const user = await decodeJWT(token);
    //                         if(user) {
    //                             return {
    //                                 currentUser: user
    //                             }
    //                         }
    //                     }
    //                     throw new Error("Not Authorised to Subscribe...");
    //                 },
    //                 onDisconnect: () => {
    //                     console.log("Client disconnected from subscriptions");
    //                 }
    //     },
    //     { server: ws, path: "/subscriptions" }
    //   );
    server.installSubscriptionHandlers(ws);
    createConnection(connectionOptions).then(() => {
        ws.listen({ port: 4000 }, () => console.log(`🚀 Server ready and listening at ==> http://localhost:4000${server.graphqlPath}`))
    }).catch(e => console.log(e));
}
main().catch((error)=> {
    console.log(error, 'error');
});
