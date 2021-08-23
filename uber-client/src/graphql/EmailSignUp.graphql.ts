import { gql } from "@apollo/client";

export const EMAIL_SIGN_UP = gql`
  mutation emailSignUp(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $profilePhoto: String!
    $age: Float!
    $phoneNumber: String!
  ) {
    EmailSignUp( data : {
        firstName: $firstName
        lastName: $lastName
        profilePhoto: $profilePhoto
        age: $age
        phoneNumber: $phoneNumber
        email: $email
        password: $password
      }
    ) {
      ok
      error
      token
    }
  }
`;