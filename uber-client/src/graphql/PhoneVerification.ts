import { gql } from '@apollo/client';

export const PHONE_VERIFICATION_MUTATION = gql`
    mutation phoneVerification($phone: String!) {
        PhoneVerification(data: { phone: $phone}) {
            ok
            error
        }
    }
`;