import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import PhoneLoginPresenter from "./PhoneLoginPresenter";
import { toast } from 'react-toastify';
import { usePhoneVerificationMutation } from "src/generated/graphql";

interface IState {
  countryCode: string;
  phoneNumber: string;
}

const PhoneLoginContainer: React.FC<RouteComponentProps<any>> = (props) => {
  const { history } = props;
  const [state, setState] = useState<IState>({
    countryCode: "+91",
    phoneNumber: ""
  });
  const [phoneVerification, { data, loading, error } ] = usePhoneVerificationMutation();
  if(data && data.PhoneVerification.ok) {
    toast.success("SMS Sent!");
    setTimeout(() => { 
      history.push({
        pathname: "/verify-phone",
        state: {
          phone: `${state.countryCode}${state.phoneNumber}`
        }
      });
    }, 2000);
  } else {
    toast.error(data?.PhoneVerification.error);
  }
  error && console.log(`Error: ${error}`);
  const onInputChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (event) => {
    const { target: { name, value } } = event;
    setState({
      ...state,
      [name]: value
    } as any);
  }

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const { countryCode, phoneNumber } = state;
    const isValid = /^\+[1-9]{1}[0-9]{7,11}$/.test(`${countryCode}${phoneNumber}`);
    if(isValid) {
      await phoneVerification({ variables: { phone: `${countryCode}${phoneNumber}`}});
    } else {
      toast.error("Phone number in invalid");
    }
  }
  return <PhoneLoginPresenter {...state} onInputChange={onInputChange} onSubmit={onSubmit} loading={loading} />;
}

export default PhoneLoginContainer;