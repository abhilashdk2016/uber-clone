import { gql } from "@apollo/client";

export const EMAIL_SIGN_IN = gql`
  mutation emailSignIn(
    $email: String!
    $password: String!
  ) {
    EmailConnect( data : {
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