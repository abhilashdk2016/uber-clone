import { gql } from "@apollo/client";

export const ADD_PLACE = gql`
  mutation addPlace(
    $name: String
    $isFav: Boolean
    $address: String
    $latitude: Float
    $longitude: Float
  ) {
    AddPlace( data : {
        name: $name
        isFav: $isFav
        address: $address
        latitude: $latitude
        longitude: $longitude
      }
    ) {
      ok
      error
    }
  }
`;