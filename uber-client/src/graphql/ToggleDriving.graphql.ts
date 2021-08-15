import { gql } from '@apollo/client';

export const TOGGLE_DRIVING_MUTATION = gql`
    mutation toggleDriving {
        ToggleDrivingMode {
            ok
            error
        }
    }
`;