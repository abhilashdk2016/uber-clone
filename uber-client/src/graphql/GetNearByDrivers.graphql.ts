import { gql } from "@apollo/client";

export const GET_NEARBY_DRIVERS = gql`
  query getNearByRides {
    GetNearbyDrivers {
      ok
      error
      drivers {
          id
          lastLatitude
          lastLongitude
      }
    }
  }
`;