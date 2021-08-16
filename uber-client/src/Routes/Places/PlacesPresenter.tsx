import React from "react";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import Header from "../../Components/Header";
import Place from "../../Components/Place";
import styled from "../../styled.d";

const Container = styled.div`
  padding: 0 40px;
`;

const SLink = styled(Link)`
  text-decoration: underline;
`;

interface IProps {
  data?: any;
  loading: boolean;
}

const PlacesPresenter: React.FC<IProps> = ({
  data: { GetMyPlaces: { places = null } = {} } = {},
  loading
}) => (
  <React.Fragment>
    <Helmet>
      <title>Places | Uber</title>
    </Helmet>
    <Header title={"Places"} backTo={"/"} />
    <Container>
      {!loading &&
        places &&
        places.length === 0 && (
          "No places yet!"
        )}
      {!loading &&
        places &&
        places.map(place => (
          <Place
            key={place!.id}
            id={place!.id}
            fav={place!.isFav}
            name={place!.name}
            address={place!.address}
          />
        ))}
        <SLink to={"/add-place"}>Add some places!</SLink>
    </Container>
  </React.Fragment>
);

export default PlacesPresenter;