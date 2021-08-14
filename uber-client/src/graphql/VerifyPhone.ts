import { gql } from '@apollo/client';

export const VERIFY_PHONENUMBER_MUTATION = gql`
    mutation verifyPhone($phone: String!, $key: String!) {
        CompletePhoneVerification(data: { phone: $phone, key: $key}) {
            ok
            error
            token
        }
    }
`;