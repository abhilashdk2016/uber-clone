import { gql } from '@apollo/client';

export const USER_PROFILE = gql`
    query userProfile {
        GetMyProfile {
            ok
            error
            user {
                id
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