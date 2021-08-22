import { gql } from "@apollo/client";

export const UPDATE_RIDE_STATUS = gql`
  mutation updateRide($id: ID!, $status: String) {
    UpdateRide(data: { id: $id, status: $status }) {
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