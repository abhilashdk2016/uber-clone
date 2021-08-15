import { gql } from '@apollo/client';

export const USER_PROFILE = gql`
    query userProfile {
        GetMyProfile {
            ok
            error
            user {
                profilePhoto
                firstName
                lastName
                email
                phoneNumber
                isDriving
            }
        }
    }
`;