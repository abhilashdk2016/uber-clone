import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useEmailSignInMutation } from "../../generated/graphql";
import { toast } from 'react-toastify';
import EmailSignInPresenter from './EmailSignInPresenter';
import { LOG_USER_IN } from '../../sharedQueries';
import { useMutation } from "@apollo/react-hooks";

interface IState {
    email: string;
    password: string;
  }
  
interface IProps extends RouteComponentProps<any> {}

const EmailSignInContainer : React.FC<IProps> = () => {
    const [state, setState ] = useState<IState>({
        email: "",
        password: ""
    });
    const [logUserIn] = useMutation(LOG_USER_IN);

    const [emailSignInMutation, { data }] = useEmailSignInMutation({
           variables: {
              email: state.email,
              password: state.password
           }
         });
    if(data && data.EmailConnect.ok) {
        //history.push("/");
        logUserIn({ variables: { token: data.EmailConnect.token } });
    } else {
        toast.error(data?.EmailConnect.error);
    }

    const onInputChange: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
        const { target: { name, value, files } } = event;
        setState({
            ...state,
            [name]: value
        } as any);
      }

      //return <div>Hello</div>
    return <EmailSignInPresenter
        email={state.email}
        onInputChange={onInputChange}
        onSubmit={emailSignInMutation}
        password={state.password}
    />
}

export default EmailSignInContainer;
