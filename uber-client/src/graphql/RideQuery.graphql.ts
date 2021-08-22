import { gql } from "@apollo/client";
export const GET_RIDE = gql`
  query getRide($id: ID!) {
    GetRide(data: { id: $id }) {
      ok
      error
      ride {
        id
        status
        duration
        distance
        pickUpAddress
        dropOffAddress
        price
        chatId
        driver {
            id
            firstName
            lastName
            profilePhoto
        }
        passenger {
            id
            firstName
            lastName
            profilePhoto
        }
      }
    }
  }
`;