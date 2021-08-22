import { gql } from '@apollo/client';

export const NEAR_BY_RIDE_SUBSCRIPTION = gql`
    subscription nearByRide {
        nearByRide {
            id
            status
            duration
            distance
            pickUpAddress
            dropOffAddress
            price
            chatId
            driver {
                id
                firstName
                lastName
                profilePhoto
            }
            passenger {
                id
                firstName
                lastName
                profilePhoto
            }
        }
    }
`;