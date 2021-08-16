import React from "react";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import Header from "../../Components/Header";
import Place from "../../Components/Place";
import styled from "../../styled.d";

const Container = styled.div`
  padding: 0px 40px;
`;

const Image = styled.img`
  height: 60px;
  width: 60px;
  border-radius: 50%;
`;

const GridLink = styled(Link)`
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-gap: 10px;
  margin-bottom: 10px;
`;

const Keys = styled.div``;

const Key = styled.span`
  display: block;
  margin-bottom: 5px;
`;

const FakeLink = styled.span`
  text-decoration: underline;
  cursor: pointer;
`;

const SLink = styled(Link)`
  display: block;
  text-decoration: underline;
  margin: 20px 0px;
`;

interface IProps {
  logUserOut: any;
  userData?: any;
  userDataLoading: boolean;
  placesLoading: boolean;
  placesData: any;
}

const SettingsPresenter: React.FC<IProps> = ({
  logUserOut,
  userData: { GetMyProfile: { user = null } = {} } = {},
  placesData: { GetMyPlaces: { places = null } = {} } = {},
  placesLoading,
  userDataLoading
}) => (
  <React.Fragment>
    <Helmet>
      <title>Settings | Nuber</title>
    </Helmet>
    <Header title={"Account Settings"} backTo={"/"} />
    <Container>
      <GridLink to={"/edit-account"}>
        {!userDataLoading &&
          user &&
          user.profilePhoto &&
          user.email &&
          user.firstName && user.lastName && (
            <React.Fragment>
              <Image src={user.profilePhoto} />
              <Keys>
                <Key>{user.firstName}&nbsp;{user.lastName}</Key>
                <Key>{user.email}</Key>
              </Keys>
            </React.Fragment>
          )}
      </GridLink>
      {!placesLoading 
        && places 
        && places.map(place => <Place id={place.id} fav={place.isFav} name={place.name} address={place.address} />)}
      
      <SLink to={"/places"}>Go to Places</SLink>
      <FakeLink onClick={logUserOut as any}>Log Out</FakeLink>
    </Container>
  </React.Fragment>
);

export default SettingsPresenter;