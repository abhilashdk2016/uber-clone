import React from 'react';
import { useEditPlaceMutation } from '../../generated/graphql';
import PlacePresenter from './PlacePresenter';

interface IProps {
    fav: boolean;
    name: string;
    address: string;
    id: string;
}

const PlaceContainer: React.FC<IProps> = (props) => {
    const { fav, name, address, id } = props;
    const [editPlaceMutation] = useEditPlaceMutation({
      variables: {
         name: name,
         isFav: !fav,
         id: id
      },
      refetchQueries: ["getPlaces"]
    });
    return <PlacePresenter fav={fav} name={name} address={address} onStarPress={editPlaceMutation}/>
}

export default PlaceContainer;