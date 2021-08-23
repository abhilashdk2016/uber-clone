import { gql } from '@apollo/client';

export const VERIFY_EMAIL_MUTATION = gql`
    mutation verifyEmail($key: String!, $email: String!) {
        CompleteEmailVerification(data: {key: $key, email: $email}) {
            ok
            error
            token
        }
    }
`;