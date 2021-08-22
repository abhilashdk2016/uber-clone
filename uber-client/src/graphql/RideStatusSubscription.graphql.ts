import { gql } from "@apollo/client";

export const RIDE_SUBSCRIPTION = gql`
    subscription rideStatus {
        rideStatus {
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