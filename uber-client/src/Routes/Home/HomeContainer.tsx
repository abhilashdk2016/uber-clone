import React, { useEffect, useRef, useState } from "react";
import { RouteComponentProps } from "react-router";
import ReactDOM from "react-dom";
import { useUserProfileQuery } from "../../generated/graphql";
import HomePresenter from "./HomePresenter";

interface IState {
  isMenuOpen: boolean;
  latitude: number;
  longitude: number;
}

interface IProps extends RouteComponentProps<any> {
  google: any;
}

let map: google.maps.Map;
let userMarker: google.maps.Marker;
const HomeContainer: React.FC<IProps>  = (props) => {
  const mapRef = useRef(null);
  const [ state, setState ] = useState<IState>({
      isMenuOpen: false,
      latitude: 0,
      longitude: 0
  });

  const { loading } = useUserProfileQuery();

  const handleGeoWatchSuccess = (position) => {
    const {
      coords: { latitude, longitude }
    } = position;
    userMarker.setPosition({ lat: latitude, lng: longitude });
    map.panTo({ lat: latitude, lng: longitude });
  }

  const handleGeoWatchError = e => {
    console.log(e);
  }

  const loadMap = (latitude, longitude) => {
    const { google } = props;
    const maps = google.maps;
    const mapNode = ReactDOM.findDOMNode(mapRef.current);
    const mapConfig: google.maps.MapOptions = {
        zoom: 11,
        center: {
            lat: latitude,
            lng: longitude
        },
        minZoom: 8,
        disableDefaultUI: true
    }
    map = new maps.Map(mapNode, mapConfig);
    const userMarkerOptions: google.maps.MarkerOptions = {
      icon: {
        path: maps.SymbolPath.CIRCLE,
        scale: 7
      },
      position: {
        lat: latitude,
        lng: longitude
      }
    };
    userMarker = new maps.Marker(userMarkerOptions);
    userMarker.setMap(map);
    const watchOptions: PositionOptions = {
      enableHighAccuracy: true
    };
    navigator.geolocation.watchPosition(
      handleGeoWatchSuccess,
      handleGeoWatchError,
      watchOptions
    );
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async position => {
      const { coords: { latitude, longitude }} = position;
      setState({...state, latitude, longitude });
      loadMap(latitude,longitude);
    }, () => console.log("Error"))
  }, []);

  const toggleMenu = () => {
    setState({ ...state, isMenuOpen : !state.isMenuOpen });
  };
  return (
    <HomePresenter isMenuOpen={state.isMenuOpen} toggleMenu={toggleMenu} loading={loading} mapRef={mapRef}/>
  )
}

export default HomeContainer;