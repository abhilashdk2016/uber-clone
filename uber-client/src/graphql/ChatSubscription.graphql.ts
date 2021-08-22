import { gql } from "apollo-boost";

export const SUBSCRIBE_TO_MESSAGES = gql`
subscription messageSubscription {
    chatRoom {
        id
        text
        userId
    }
}
`;