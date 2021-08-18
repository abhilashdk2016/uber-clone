import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { RouteComponentProps } from "react-router-dom";
import FindAddressPresenter from "./FindAddressPresenter";
import { reverseGeoCode, geoCode } from "../../mapHelper";

interface IState {
  latitude: number;
  longitude: number;
  address: string;
}
interface IProps extends RouteComponentProps<any> {
  google: any;
}

let map: google.maps.Map;
const FindAddressContainer: React.FC<IProps> = (props) => {
  const mapRef = useRef(null);
 
  const [state, setState] = useState<IState>({
    address: "",
    latitude: 0,
    longitude: 0
  });

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
        disableDefaultUI: true
    }
    map = new maps.Map(mapNode, mapConfig);
    map.addListener("dragend", async () => {
      const newCenter = map.getCenter();
      const latitude = newCenter.lat();
      const longitude = newCenter.lng();
      await reverseGeoCodeAddress(latitude, longitude);
    })
  }

  const reverseGeoCodeAddress = async (latitude, longitude) => {
    const reversedAddress = await reverseGeoCode(latitude, longitude);
    if(reversedAddress !== false) {
      setState({ address: reversedAddress, latitude, longitude });
    } else {
      setState({ ...state, latitude, longitude });
    }
  }
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async position => {
      const { coords: { latitude, longitude }} = position;
      loadMap(latitude,longitude);
      await reverseGeoCodeAddress(latitude, longitude);
    }, () => console.log("Error"))
  }, []);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value }
    } = event;
    setState({
      ...state,
      [name]: value
    } as any);
  };
  const onInputBlur = async () => {
    const { address } = state;
    const result = await geoCode(address);
    if (result !== false) {
      const { lat, lng, formatted_address: formatedAddress } = result;
      setState({
        address: formatedAddress,
        latitude: lat,
        longitude: lng
      });
      map.panTo({ lat, lng });
    }
  };
  const onPickPlace = () => {
    const { address, latitude, longitude } = state;
    const { history } = props;
    history.push({
      pathname: "/add-place",
      state: {
        address,
        latitude,
        longitude
      }
    });
    console.log(address, latitude, longitude);
  };
  return <FindAddressPresenter mapRef={mapRef} address={state.address}  onInputChange={onInputChange}
  onInputBlur={onInputBlur} onPickPlace={onPickPlace}/>;
}

export default FindAddressContainer;