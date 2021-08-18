import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useAddPlaceMutation } from "../../generated/graphql";
import AddPlacePresenter from "./AddPlacePresenter";
import { toast } from 'react-toastify';

interface IState {
  address: string;
  name: string;
  latitude: number;
  longitude: number;
  isFav: boolean;
}

interface IProps extends RouteComponentProps<any> {}

const AddPlaceContainer: React.FC<IProps> = (props) => {
  const { history, location } = props;
  const { state = {} } = location as any;
  const [localState, setState] = useState<IState>({
    address: state.address || "",
    name: "",
    latitude: state.latitude || 0,
    longitude: state.longitude || 0,
    isFav: false
  });
  const [addPlaceMutation, { data, loading }] = useAddPlaceMutation({
       variables: {
          name: localState.name,
          isFav: localState.isFav,
          address: localState.address,
          latitude: localState.latitude,
          longitude: localState.longitude
       },
       refetchQueries: ["getPlaces"]
     });

  useEffect(() => {
    if(data && data.AddPlace.ok) {
      toast.success("Place added sucessfully");
      setTimeout(() => history.push("/places") , 2000);
    } else if(data && data.AddPlace.error) {
      toast.error(data.AddPlace.error);
    }
   }, [data, history])
  const onInputChange: React.ChangeEventHandler<
    HTMLInputElement
  > = async event => {
    const {
      target: { name, value }
    } = event;
    setState({
      ...state,
      [name]: value
    } as any);
  };

  return (
      <AddPlacePresenter
        onInputChange={onInputChange}
        address={state.address}
        name={state.name}
        loading={loading}
        onSubmit={addPlaceMutation}
        pickedAddress={state.latitude !== 0 && state.longitude !== 0}
      />
    );

  
}

export default AddPlaceContainer;