import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useEmailSignUpMutation } from "../../generated/graphql";
import axios from 'axios';
import { toast } from 'react-toastify';
import EmailSignUpPresenter from './EmailSignUpPresenter';

interface IState {
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    profilePhoto: string;
    phoneNumber: string;
    uploading: boolean;
    password: string;
    confirmPassword: string;
  }
  
interface IProps extends RouteComponentProps<any> {}

const EmailSinUpContainer : React.FC<IProps> = (props: any) => {
    const { location } = props;
    const [state, setState ] = useState<IState>({
        email: "",
        firstName: "",
        age: 0,
        lastName: "",
        profilePhoto: "",
        phoneNumber: location.state.phoneNumber,
        uploading: false,
        password: "",
        confirmPassword: ""
    });

    const [emailSignUpMutation, { data }] = useEmailSignUpMutation();
    if(data && data.EmailSignUp.ok) {
        //history.push("/");
        toast.success("Verification email sent.")
        setTimeout(() => { 
            props.history.push({
                pathname: "/email-verify",
                state: {
                    email: state.email
                }
            });
        }, 2000);
    } else {
        toast.error(data?.EmailSignUp.error);
    }

    const onSubmit = async event => {
        if(state.password !== state.confirmPassword) {
            toast.error("Passwords do not match");
        } else {
            await emailSignUpMutation({
                variables: {
                    firstName: state.firstName,
                    lastName: state.lastName,
                    email: state.email,
                    profilePhoto: state.profilePhoto,
                    password: state.password,
                    age: state.age,
                    phoneNumber: state.phoneNumber
                 }
            });
        }
    }

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
            [name]: name === "age" ? parseFloat(value) : value
            } as any);
        }
      }

      //return <div>Hello</div>
    return <EmailSignUpPresenter
        email={state.email}
        firstName={state.firstName}
        lastName={state.lastName}
        profilePhoto={state.profilePhoto}
        phoneNumber={state.phoneNumber}
        onInputChange={onInputChange}
        onSubmit={onSubmit}
        uploading={state.uploading}
        age={state.age}
        password={state.password}
        confirmPassword={state.confirmPassword}
    />
}

export default EmailSinUpContainer;
