import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useVerifyPhoneMutation } from "src/generated/graphql";
import VerifyPhonePresenter from "./VerifyPhonePresenter";
import { toast } from 'react-toastify';
import { LOG_USER_IN } from '../../sharedQueries';
import { useMutation } from "@apollo/react-hooks";

interface IState {
    key: string;
    phone: string;
  }

const VerifyPhoneContainer: React.FC<RouteComponentProps<any>> = (props: any) => {
    if (!props.location.state) {
        props.history.push("/");
    }
    const [verifyPhoneMutation, { data, loading } ] = useVerifyPhoneMutation();
    const [logUserIn] = useMutation(LOG_USER_IN);
    if(data && data.CompletePhoneVerification.ok) {
        console.log('Verified');
        toast.success("Phone Number Verified. Logging in Now");
        logUserIn({ variables: { token: data.CompletePhoneVerification.token } });
    } else {
        toast.error(data?.CompletePhoneVerification.error);
    }
    const [state, setState] = useState<IState>({
        key: "",
        phone: props.location.state.phone
    });

    const onSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
        await verifyPhoneMutation({ variables: { ...state }});
    }

    const onInputChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (event) => {
        const { target: { name, value } } = event;
        setState({
          ...state,
          [name]: value
        } as any);
      }
    return <VerifyPhonePresenter verificationKey={state.key} onSubmit={onSubmit} onInputChange={onInputChange} loading={loading}/>;
}

export default VerifyPhoneContainer;