import { gql } from "@apollo/client";

export const RIDE_REQUEST = gql`
  mutation rideRequest($duration: String!
        $distance: String!
        $pickUpAddress: String!
        $dropOffAddress: String!
        $pickUpLatitude: Float!
        $pickUpLongitude: Float!
        $dropOffLatitude: Float!
        $dropOffLongitude: Float!
        $price: Float!
    ) {
    RequestRide( data: {
            duration: $duration
            distance: $distance
            pickUpAddress: $pickUpAddress
            dropOffAddress: $dropOffAddress
            pickUpLatitude: $pickUpLatitude
            pickUpLongitude: $pickUpLongitude
            dropOffLatitude: $dropOffLatitude
            dropOffLongitude: $dropOffLongitude
            price: $price
        }
    ) {
      ok
      error
      ride {
          id
      }
    }
  }
`;