import React from "react";
import { RouteComponentProps } from "react-router";
import { RIDE_SUBSCRIPTION } from "../../graphql/RideStatusSubscription.graphql";
import { useGetRideQuery, useUserProfileQuery,useUpdateRideMutation } from "../../generated/graphql";
import RidePresenter from "./RidePresenter";

interface IProps extends RouteComponentProps<any> {}

const RideContainer: React.FC<IProps>  = (props) => {
  const { match, history } = props;
  if(!match.params.rideId){
    history.push("/");
  }
  const { data, subscribeToMore } = useGetRideQuery({
      variables: {
          id: match.params.rideId
      }
  });

  const { data: userProfileData, loading } = useUserProfileQuery();
  subscribeToMore({
      document: RIDE_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        const subData = subscriptionData.data as any;
        console.log(subData);
        if(subData.rideStatus.status === "FINISHED") {
            window.location.href = "/";
        }
        if(!subscriptionData.data) {
          return prev;
        }
        const newObject = Object.assign({}, prev, {
          ...prev.GetRide,
          GetRide: {
            ride: subData.rideStatus
          }
        });
        return newObject;
      }
    })
  const [updateRideMutation] = useUpdateRideMutation();
  
  return ( 
    <RidePresenter data={data} loading={loading} userData={userProfileData} updateRideFn={updateRideMutation} />
  )
}

export default RideContainer;