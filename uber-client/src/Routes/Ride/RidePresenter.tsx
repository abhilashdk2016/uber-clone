import React from "react";
import styled from "../../styled.d";
import { Link } from "react-router-dom";
import Button from "../../Components/Button";
import { GetRideQuery, UserProfileQuery } from "../../generated/graphql";

interface IProps {
    data?: GetRideQuery;
    userData?: UserProfileQuery;
    loading: boolean;
    updateRideFn: any;
}

const Container = styled.div`
  padding: 40px;
`;

const Title = styled.h4`
  font-weight: 800;
  margin-top: 30px;
  margin-bottom: 10px;
  &:first-child {
    margin-top: 0;
  }
`;

const Data = styled.span`
  color: ${props => props.theme.blueColor};
`;

const Img = styled.img`
  border-radius: 50%;
  margin-right: 20px;
  max-width: 50px;
  height: 50px;
`;

const Passenger = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Buttons = styled.div`
  margin: 30px 0px;
`;

const ExtendedButton = styled(Button)`
  margin-bottom: 30px;
`;

const RidePresenter: React.FC<IProps> = ({ data, userData, updateRideFn }) => {
    const ride  = data?.GetRide.ride;
    const user = userData?.GetMyProfile.user;
    return <Container>
        { ride && user &&
            <>
                <Title>Passenger</Title>
                <Passenger>
                    <Img src={ride.passenger.profilePhoto!} />
                    <Data>{`${ride.passenger.firstName!} ${ride.passenger.lastName!}`}</Data>
                </Passenger>
                {ride.driver && (
                    <React.Fragment>
                    <Title>Driver</Title>
                    <Passenger>
                        <Img src={ride.driver.profilePhoto!} />
                        <Data>{`${ride.driver.firstName!} ${ride.driver.lastName!}`}</Data>
                    </Passenger>
                    </React.Fragment>
                )}
                <Title>From</Title>
                <Data>{ride.pickUpAddress}</Data>
                <Title>To</Title>
                <Data>{ride.dropOffAddress}</Data>
                <Title>Price</Title>
                <Data>{ride.price}</Data>
                <Title>Distance</Title>
                <Data>{ride.distance}</Data>
                <Title>Duration</Title>
                <Data>{ride.duration}</Data>
                <Title>Status</Title>
                <Data>{ride.status}</Data>
                <Buttons>
                    {ride.driver?.id === user.id &&
                    ride.status === "ACCEPTED" && (
                        <ExtendedButton
                        type="submit"
                        value={"Picked Up"}
                        onClick={() =>
                            updateRideFn({
                            variables: {
                                id: ride.id,
                                status: "ONROUTE"
                            }
                            })
                        }
                        />
                    )}
                    {ride.driver?.id === user.id &&
                    ride.status === "ONROUTE" && (
                        <ExtendedButton
                        type="submit"
                        value={"Finished"}
                        onClick={() =>
                            updateRideFn({
                            variables: {
                                id: ride.id,
                                status: "FINISHED"
                            }
                            })
                        }
                        />
                    )}
                    {ride.status !== "REQUESTING" && (
                        <Link to={`/chat/${ride.chatId}`}>
                            <ExtendedButton type="submit" value={"Chat"} onClick={null} />
                        </Link>
                        )}
                </Buttons>
            </>
        }
    </Container>
};

export default RidePresenter;
