import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useVerifyEmailMutation } from "src/generated/graphql";
import VerifyEmailPresenter from "./VerifyEmailPresenter";
import { toast } from 'react-toastify';
import { LOG_USER_IN } from '../../sharedQueries';
import { useMutation } from "@apollo/react-hooks";

interface IState {
    key: string;
    email: string;
  }

const VerifyEmailContainer: React.FC<RouteComponentProps<any>> = (props: any) => {
    const { location } = props;
    const [logUserIn] = useMutation(LOG_USER_IN);
    const [verifyEmailMutation, { data, loading }] = useVerifyEmailMutation()
    if(data && data.CompleteEmailVerification.ok) {
        toast.success("Email Verified. Logging in Now");
        logUserIn({ variables: { token: data.CompleteEmailVerification.token } });
    } else {
        toast.error(data?.CompleteEmailVerification.error);
    }
    const [state, setState] = useState<IState>({
        key: "",
        email: location.state.email
    });

    const onSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
        await verifyEmailMutation({ variables: { ...state }});
    }

    const onInputChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (event) => {
        const { target: { name, value } } = event;
        setState({
          ...state,
          [name]: value
        } as any);
      }
    return <VerifyEmailPresenter verificationKey={state.key} onSubmit={onSubmit} onInputChange={onInputChange} loading={loading}/>;
}

export default VerifyEmailContainer;