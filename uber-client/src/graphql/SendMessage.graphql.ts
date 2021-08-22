import { gql } from '@apollo/client';
export const SEND_MESSAGE = gql`
  mutation sendMessage($message: String!, $id: ID!) {
    SendChat(data: { message: $message, id: $id }) {
      ok
      error
      message {
        id
        text
        userId
      }
    }
  }
`;