import { gql } from "apollo-boost";

export const GET_CHAT = gql`
  query getChat($id: ID!) {
    GetChat(data: { id: $id }) {
      ok
      error
      chat {
        passengerId
        driverId
        messages {
          id
          text
          userId
        }
      }
    }
  }
`;