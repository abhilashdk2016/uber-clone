import { useMutation } from "@apollo/react-hooks";
import React from "react";
import { RouteComponentProps } from "react-router";
import { LOG_USER_Out } from "../../sharedQueries";
import { useGetPlacesQuery, useUserProfileQuery } from "../../generated/graphql";
import SettingsPresenter from "./SettingsPresenter";

interface IProps extends RouteComponentProps<any> {}

const SettingsContainer: React.FC<IProps>  = () => {
  
  const { data, loading } = useUserProfileQuery();
  const { data: getPlacesData, loading: getPlacesLoading  } = useGetPlacesQuery();
  const [logUserOut ] = useMutation(LOG_USER_Out);
  
  return (
    <SettingsPresenter userDataLoading={loading} userData={data}  logUserOut={logUserOut} placesLoading={getPlacesLoading} placesData={getPlacesData}/>
  )
}

export default SettingsContainer;