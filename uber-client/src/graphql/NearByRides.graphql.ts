import { gql } from "@apollo/client";

export const NEAR_BY_RIDES = gql`
  query nearByRides {
    NearByRides {
      ok
      error
      ride {
          id
          pickUpAddress
          dropOffAddress
          price
          distance
          passenger {
            firstName
            lastName
            profilePhoto
          }
      }
    }
  }
`;