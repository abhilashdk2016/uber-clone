import React from "react";
import { RouteComponentProps } from "react-router";
import { useGetPlacesQuery } from "../../generated/graphql";
import PlacesPresenter from "./PlacesPresenter";

interface IProps extends RouteComponentProps<any> {}

const PlacesContainer: React.FC<IProps>  = () => {
  const { data, loading  } = useGetPlacesQuery();
  
  return (
    <PlacesPresenter data={data} loading={loading}/>
  )
}

export default PlacesContainer;