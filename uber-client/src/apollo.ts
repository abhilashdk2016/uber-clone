import { ApolloClient, createHttpLink, InMemoryCache, split, gql } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

interface Definition {
    kind: string;
    operation?: string;
};


const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql'
});

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            "X-JWT": localStorage.getItem("jwt") || ""
        }
    }
});

const wsLink = new WebSocketLink({
    uri: "ws://localhost:4000/subscriptions",
    options: {
        reconnect: true,
        connectionParams: {
            headers: {
                "X-JWT": localStorage.getItem("jwt") || ""
            }
        }
    },
});

const link = split(
    ({ query }) => {
        const { kind, operation }: Definition = getMainDefinition(query);
        return (
            kind === 'OperationDefinition' && operation === 'subscription'
        );
    },
    wsLink,
    authLink.concat(httpLink)
);

const QUERY = gql`
  query getAuth {
    isLoggedIn @client
  }
`;

const cache = new InMemoryCache();
cache.writeQuery({
    query: QUERY,
    data: {
        isLoggedIn: false
    }
});

const client = new ApolloClient({
    link,
    cache,
    resolvers: {
        Mutation: {
            logUserIn: (_, { token }, { cache }) => {
                localStorage.setItem("jwt", token);
                cache.writeQuery({
                    query: QUERY,
                    data: {
                        isLoggedIn: true
                    }
                });
                return null;
            },
            logUserOut: (_, __, { cache}) => {
                localStorage.removeItem("jwt");
                cache.writeQuery({
                    query: QUERY,
                    data: {
                        isLoggedIn: false
                    }
                });
                return null;
            },
            checkUserLogin: (_, __, { cache }) => {
                let jwt = localStorage.getItem("jwt");
                cache.writeQuery({
                    query: QUERY,
                    data: {
                        isLoggedIn: jwt ? true : false
                    }
                });
                return null;
            },
        }
    },
    
});

export default client;