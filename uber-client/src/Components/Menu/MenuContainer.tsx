import React from "react";
import { UserProfileQuery, useToggleDrivingMutation } from "src/generated/graphql";
import MenuPresenter from "./MenuPresenter";
import { toast } from 'react-toastify';
import { USER_PROFILE } from "../../graphql/Userprofile.graphql";

const MenuContainer: React.FC = () => {
  const [toggleDrivingMutation, { loading }] = useToggleDrivingMutation({
    update(cache, { data }) {
      if(data) {
        const { ToggleDrivingMode } = data;
        if(!ToggleDrivingMode.ok) {
          toast.error(ToggleDrivingMode.error);
          return;
        } else {
          const query: UserProfileQuery | null = cache.readQuery({ query: USER_PROFILE });
          if(query && query.GetMyProfile.user) {
            const newQuery = JSON.parse(JSON.stringify(query.GetMyProfile));
            newQuery.user!.isDriving = !query.GetMyProfile.user.isDriving;
            const newData = { ...query, GetMyProfile: newQuery };
            cache.writeQuery({ query: USER_PROFILE, data: newData });
          }
        }
      }
    }
  });
  return !loading ? <MenuPresenter toggleDrivingFn={toggleDrivingMutation}/> : null;
}

export default MenuContainer;