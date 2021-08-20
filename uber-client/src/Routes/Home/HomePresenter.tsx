import React from "react";
import Helmet from "react-helmet";
import Sidebar from "react-sidebar";
import Menu from "../../Components/Menu";
import AddressBar from "../../Components/Addressbar";
import Button from "../../Components/Button";
import styled from "../../styled.d";

const Container = styled.div``;

const MenuButton = styled.button`
  appearance: none;
  padding: 10px;
  position: absolute;
  top: 10px;
  left: 10px;
  text-align: center;
  font-weight: 800;
  border: 0;
  cursor: pointer;
  font-size: 20px;
  transform: rotate(90deg);
  z-index: 2;
  background-color: transparent;
`;

const ExtendedButton = styled(Button)`
  position: absolute;
  bottom: 50px;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 10;
  height: auto;
  width: 80%;
`;

const Map = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
`;

const RequestButton = styled(ExtendedButton)`
  bottom: 250px;
`;

interface IProps {
  mapRef: any;
  isMenuOpen: boolean;
  toggleMenu: () => void;
  loading: boolean;
  toAddress: string;
  onAddressSubmit: () => void;
  price?: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  data?: any;
  onRideSubmit: () => void;
  nearByRides?: any;
}

const HomePresenter: React.FC<IProps> = ({ 
    isMenuOpen, 
    toggleMenu, 
    loading, 
    mapRef,
    toAddress,
    onInputChange,
    onAddressSubmit,
    price,
    data,
    onRideSubmit,
    nearByRides}) => (
  <Container>
    <Helmet>
      <title>Home | Number</title>
    </Helmet>
    <Sidebar
      sidebar={<Menu />}
      open={isMenuOpen}
      onSetOpen={toggleMenu}
      styles={{
        sidebar: {
          backgroundColor: "white",
          width: "80%",
          zIndex: "10"
        }
      }}
    >
      {!loading && <MenuButton onClick={toggleMenu}>|||</MenuButton>}
      {data && data.GetMyProfile.user && !data.GetMyProfile.user.isDriving && <AddressBar
        name={"toAddress"}
        onChange={onInputChange}
        value={toAddress}
        onBlur={null}
      />}
      {price && (
        <RequestButton
          onClick={onRideSubmit}
          disabled={toAddress === ""}
          value={`Request Ride ($${price})`}
          type="submit"
        />
      )}
      {data && data.GetMyProfile.user && !data.GetMyProfile.user.isDriving && <ExtendedButton
        onClick={onAddressSubmit}
        disabled={toAddress === ""}
        value={price ? "Change Address" : "Pick Address"}
        type="submit"
      />}
      { nearByRides && "somebody wants your car"}
      <Map ref={mapRef} />
    </Sidebar>
  </Container>
);

export default HomePresenter;