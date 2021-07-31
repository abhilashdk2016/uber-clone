import { ApolloServer } from "apollo-server-express";
import Express from "express";
import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import connectionOptions from "./ormConfig";

// resolvers
import {HelloResolver} from "./resolvers/Hello";

const main = async () => {
    const schema = await buildSchema({
        resolvers: [ HelloResolver ],
        emitSchemaFile: true,
        validate: false,
    });
    const server = new ApolloServer({ schema });
    const app = Express();
    server.applyMiddleware({ app });
    createConnection(connectionOptions).then(() => {
        app.listen({ port: 4000 }, () => console.log(`🚀 Server ready and listening at ==> http://localhost:4000${server.graphqlPath}`))
    }).catch(e => console.log(e));
}
main().catch((error)=> {
    console.log(error, 'error');
});
