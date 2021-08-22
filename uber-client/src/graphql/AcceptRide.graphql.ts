import { gql } from "@apollo/client";

export const ACCEPT_RIDE = gql`
  mutation acceptRide(
    $id: ID!
    $status: String
  ) {
    UpdateRide( data : {
        id: $id
        status: $status
      }
    ) {
      ok
      error,
      ride {
        id
      }
    }
  }
`;