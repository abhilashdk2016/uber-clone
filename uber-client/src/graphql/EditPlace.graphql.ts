import { gql } from "@apollo/client";

export const EDIT_PLACE = gql`
  mutation editPlace(
    $name: String!
    $isFav: Boolean!
    $id: ID!
  ) {
    EditPlace( data : {
        name: $name
        isFav: $isFav
        id: $id
      }
    ) {
      ok
      error
    }
  }
`;