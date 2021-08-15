import React, { useState } from "react";
import { RouteComponentProps } from "react-router";
import { useUserProfileQuery } from "../../generated/graphql";
import HomePresenter from "./HomePresenter";

interface IState {
  isMenuOpen: boolean;
}

interface IProps extends RouteComponentProps<any> {}

const HomeContainer: React.FC<IProps>  = () => {
  const [ state, setIsMenuOpen ] = useState<IState>({
      isMenuOpen: false
  });

  const { loading } = useUserProfileQuery();

  const toggleMenu = () => {
    setIsMenuOpen({ isMenuOpen : !state.isMenuOpen });
  };
  return (
    <HomePresenter isMenuOpen={state.isMenuOpen} toggleMenu={toggleMenu} loading={loading} />
  )
}

export default HomeContainer;