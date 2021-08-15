import { gql } from "@apollo/client";

export const UPDATE_PROFILE = gql`
  mutation updateProfile(
    $firstName: String
    $lastName: String
    $email: String
    $password: String
    $profilePhoto: String
    $age: Float
  ) {
    UpdateProfile( data : {
        firstName: $firstName
        lastName: $lastName
        email: $email
        password: $password
        profilePhoto: $profilePhoto
        age: $age
      }
    ) {
      ok
      error
    }
  }
`;