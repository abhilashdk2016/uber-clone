import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useUpdateProfileMutation, useUserProfileQuery } from "src/generated/graphql";
import axios from 'axios';
import EditAccountPresenter from './EditAccounrPresenter';
import { toast } from 'react-toastify';

interface IState {
    firstName: string;
    lastName: string;
    email: string;
    profilePhoto: string;
    phoneNumber: string;
    uploading: boolean;
  }
  
interface IProps extends RouteComponentProps<any> {}

const EditAccountContainer : React.FC<IProps> = () => {
    const [state, setState ] = useState<IState>({
        email: "",
        firstName: "",
        lastName: "",
        profilePhoto: "",
        phoneNumber: "",
        uploading: false
    });

    const { data } = useUserProfileQuery();
    useEffect(() => {
        if(data && data.GetMyProfile.ok) {
            const user = data.GetMyProfile.user;
            if(user) {
                setState({
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    profilePhoto: user.profilePhoto,
                    phoneNumber: user.phoneNumber,
                    uploading: false
                })
            }
        }
    }, [data]);

    const [updateProfileMutation, { loading }] = useUpdateProfileMutation({
           variables: {
              firstName: state.firstName,
              lastName: state.lastName,
              email: state.email,
              profilePhoto: state.profilePhoto
           },
           refetchQueries: ["userProfile"],
           update(_, data) {
               if(data.data && data.data.UpdateProfile.ok) {
                   toast.success("Profile Updated");
               }
           }
         });

    const onInputChange: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
        const { target: { name, value, files } } = event;
        if(files) {
            setState({
                ...state,
                uploading: true
            });
            const formData = new FormData();
            formData.append("file", files[0]);
            formData.append("api_key", "696173272891127");
            formData.append("upload_preset", "geopins");
            formData.append("timestamp", String(Date.now() / 1000));
            const request = await axios.post(
                "https://api.cloudinary.com/v1_1/djjf5jpbw/image/upload",
                formData
            );
            if(request.data.secure_url) {
                setState({
                    ...state,
                    uploading: false,
                    profilePhoto: request.data.secure_url
                });
            }
        } else {
            setState({
            ...state,
            [name]: value
            } as any);
        }
      }

      //return <div>Hello</div>
    return <EditAccountPresenter
        email={state.email}
        firstName={state.firstName}
        lastName={state.lastName}
        profilePhoto={state.profilePhoto}
        phoneNumber={state.phoneNumber}
        onInputChange={onInputChange}
        loading={loading}
        onSubmit={updateProfileMutation}
        uploading={state.uploading}
    />
}

export default EditAccountContainer;
