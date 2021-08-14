import { gql } from '@apollo/client';

export const LOG_USER_IN = gql`
    mutation logUserIn($token: string) {
        logUserIn(token: $token) @client
    }
`;