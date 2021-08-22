import React, { useEffect, useRef, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import ReactDOM from "react-dom";
import { geoCode, reverseGeoCode } from "../../mapHelper";
import { useGetNearByRidesLazyQuery, useReportLocationMutation, useUserProfileQuery, useRideRequestMutation, useNearByRidesQuery, useAcceptRideMutation } from "../../generated/graphql";
import HomePresenter from "./HomePresenter";
import { NEAR_BY_RIDE_SUBSCRIPTION } from "../../graphql/NearByRideSubscription.graphql";

interface IState {
  isMenuOpen: boolean;
  toAddress: string;
  toLattitude: number;
  toLongitude: number;
  latitude: number;
  longitude: number;
  distance: string;
  duration?: string;
  price?: string;
  fromAddress: string;
}

interface IProps extends RouteComponentProps<any> {
  google: any;
}

let map: google.maps.Map;
let userMarker: google.maps.Marker;
let toMarker: google.maps.Marker;
let driverMarkers: google.maps.Marker[] = [];
let directions: google.maps.DirectionsRenderer;
const svgMarker = {
  path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
  fillColor: "blue",
  fillOpacity: 0.6,
  strokeWeight: 0,
  rotation: 0,
  scale: 2,
};
const HomeContainer: React.FC<IProps>  = (props) => {
  const [reportLocationMutation] = useReportLocationMutation();
  const mapRef = useRef(null);
  const [ state, setState ] = useState<IState>({
      distance: "",
      duration: undefined,
      isMenuOpen: false,
      latitude: 0,
      longitude: 0,
      toAddress: "",
      toLattitude: 0,
      toLongitude: 0,
      fromAddress: ""
  });

  // For User and Driver : Query to Obtain User Profile Information
  const { data, loading } = useUserProfileQuery();
  // For User : Query to obtain near by drivers
  const [ getNearByRides, { data: nearByDriversData } ] = useGetNearByRidesLazyQuery({ pollInterval: 3000 });
  // For User : Mutation to Request A New Ride
  const [rideRequestMutation, { data: requestRideData }] = useRideRequestMutation({
     variables: {
        duration: state.duration || "",
        distance: state.distance,
        pickUpAddress: state.fromAddress,
        dropOffAddress: state.toAddress,
        pickUpLatitude: state.latitude,
        pickUpLongitude: state.longitude,
        dropOffLatitude: state.toLattitude,
        dropOffLongitude: state.toLongitude,
        price: parseFloat(state.price || '0')
     },
   });
  if(requestRideData && requestRideData.RequestRide.ok) {
    const { history } = props;
    const { ride } = requestRideData.RequestRide;
    history.push({
      pathname: `/ride/${ride?.id}`
    });
  }
  // For Driver : Mutation to obtain near by ride requests
  let isNormalUser = true;
  if(data && data.GetMyProfile.user && data.GetMyProfile.user.isDriving) {
    isNormalUser = false;
  }
  // If User is a Driver, isDriving will be true, so if user is not a driver skip the following query
  const { data: nearByRideData, subscribeToMore } = useNearByRidesQuery();
  // const { data: nearByRideSubscriptionData} = useNearByRideSubscription({skip: isNormalUser});
  // console.log(nearByRideSubscriptionData);
  // console.log(nearByRideData);
  if(!isNormalUser) {
    subscribeToMore({
      document: NEAR_BY_RIDE_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        const subData = subscriptionData as any;
        if(!subscriptionData.data) {
          return prev;
        }
        const newObject = Object.assign({}, prev, {
          NearByRides: {
            ...prev.NearByRides,
            ride: subData.data.nearByRide
          }
        });
        console.log([prev, newObject]);
        return newObject;
      }
    })
  }
  // Mutation for accepting the Ride
  const [acceptRideMutation, { data: acceptRideData }] = useAcceptRideMutation();
  if(acceptRideData && acceptRideData.UpdateRide.ok) {
    const { history } = props;
    const { ride } = acceptRideData.UpdateRide;
    history.push({
      pathname: `/ride/${ride?.id}`
    });
  }
  // If we find nearby drivers draw them on the map
  if(nearByDriversData && nearByDriversData.GetNearbyDrivers.ok && nearByDriversData.GetNearbyDrivers.drivers) {
    const { drivers } = nearByDriversData.GetNearbyDrivers;
    for(const driver of drivers) {
      const existingDriver : google.maps.Marker | undefined = driverMarkers.find((drivermarker: google.maps.Marker) => {
        const markerId = drivermarker.get("ID");
        return markerId === driver.id;
      });
      if(existingDriver) {
        existingDriver.setPosition({ lat: driver.lastLatitude, lng: driver.lastLongitude });
        existingDriver.setMap(map);
      } else {
        const markerOptions: google.maps.MarkerOptions = {
          position: {
            lat: driver.lastLatitude,
            lng: driver.lastLongitude
          },
          icon: {
            path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
            scale: 5
          }
        };
        const newMarker: google.maps.Marker = new google.maps.Marker(markerOptions);
        newMarker.set("ID", driver.id);
        newMarker.setMap(map);
        driverMarkers.push(newMarker);
      }
    }
  }

  const handleGeoWatchSuccess = (position) => {
    const {
      coords: { latitude, longitude }
    } = position;
    userMarker.setPosition({ lat: latitude, lng: longitude });
    map.panTo({ lat: latitude, lng: longitude });
    reportLocationMutation({ variables: {
      lastLatitude: latitude,
      lastLongitude: longitude,
      lastOrientation: 0
    }});
  }

  const handleGeoWatchError = e => {
    console.log(e);
  }

  const loadMap = (latitude, longitude) => {
    const { google } = props;
    const maps = google.maps;
    const mapNode = ReactDOM.findDOMNode(mapRef.current);
    const mapConfig: google.maps.MapOptions = {
        zoom: 13,
        center: {
            lat: latitude,
            lng: longitude
        },
        disableDefaultUI: true
    }
    map = new maps.Map(mapNode, mapConfig);
    const userMarkerOptions: google.maps.MarkerOptions = {
      icon: svgMarker,
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
      const address = await reverseGeoCode(latitude, longitude);
      setState({...state, latitude, longitude, fromAddress: address });
      loadMap(latitude,longitude);
    }, () => console.log("Error"))
  }, []);

  const toggleMenu = () => {
    setState({ ...state, isMenuOpen : !state.isMenuOpen });
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value }
    } = event;
    setState({
      ...state,
      [name]: value
    } as any);
  };

  const setPrice = () => {
    const { distance } = state;
    if (distance) {
      setState({
        ...state,
        price: Number(parseFloat(distance.replace(",", "")) * 3).toFixed(2)
      });
    }
  }
  const handleRouteRequest = (
    result: google.maps.DirectionsResult,
    status: google.maps.DirectionsStatus
  ) => {
    if (status === google.maps.DirectionsStatus.OK) {
      const { routes } = result;
      const {
        distance: { text: distance },
        duration: { text: duration }
      } = routes[0].legs[0];
      directions.setDirections(result);
      directions.setMap(map);
      Promise.resolve()
      .then(() => setState(
        {
          ...state,
          distance,
          duration,
        }
      ))
      .then(() => setPrice());
    } else {
      toast.error("There is no route there, you have to ");
    }
  };
  const createPath = () => {
    const { toLattitude, toLongitude, latitude, longitude } = state;
    if (directions) {
      directions.setMap(null);
    }
    const renderOptions: google.maps.DirectionsRendererOptions = {
      polylineOptions: {
        strokeColor: "#000"
      },
      suppressMarkers: true
    };
    directions = new google.maps.DirectionsRenderer(renderOptions);
    const directionsService: google.maps.DirectionsService = new google.maps.DirectionsService();
    const to = new google.maps.LatLng(toLattitude, toLongitude);
    const from = new google.maps.LatLng(latitude, longitude);
    const directionsOptions: google.maps.DirectionsRequest = {
      destination: to,
      origin: from,
      travelMode: google.maps.TravelMode.DRIVING
    };
    directionsService.route(directionsOptions, handleRouteRequest);
  };

  const onAddressSubmit = async () => {
    const { toAddress } = state;
    const { google } = props;
    const maps = google.maps;
    const result = await geoCode(toAddress);
    if (result !== false) {
      const { lat, lng, formatted_address: formatedAddress } = result;
      if (toMarker) {
        toMarker.setMap(null);
      }
      const toMarkerOptions: google.maps.MarkerOptions = {
        position: {
          lat,
          lng
        }
      };
      toMarker = new maps.Marker(toMarkerOptions);
      toMarker.setMap(map);
      const bounds = new maps.LatLngBounds();
      bounds.extend({ lat, lng });
      bounds.extend({ lat: state.latitude, lng: state.longitude });
      map.fitBounds(bounds);
      Promise.resolve()
      .then(() => setState(
        {
          ...state,
          toAddress: formatedAddress,
          toLattitude: lat,
          toLongitude: lng
        }
      ))
      .then(() => createPath())
      .then(() => {
        getNearByRides();
      });
    }
  };
  
  return (
    <HomePresenter isMenuOpen={state.isMenuOpen} 
                   toggleMenu={toggleMenu} 
                   loading={loading} 
                   mapRef={mapRef}
                   toAddress={state.toAddress}
                   onInputChange={onInputChange}
                   onAddressSubmit={onAddressSubmit}
                   price={state.price}
                   data={data}
                   onRideSubmit={rideRequestMutation}
                   nearByRides={nearByRideData}
                   acceptRide={acceptRideMutation}/>
  )
}

export default HomeContainer;