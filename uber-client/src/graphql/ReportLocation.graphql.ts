import { gql } from "@apollo/client";

export const REPORT_LOCATION = gql`
  mutation reportLocation(
    $lastOrientation: Float
    $lastLatitude: Float
    $lastLongitude: Float
  ) {
    ReportMovement( data : {
        lastOrientation: $lastOrientation
        lastLatitude: $lastLatitude
        lastLongitude: $lastLongitude
      }
    ) {
      ok
      error
    }
  }
`;