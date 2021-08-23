import React from "react";
import Helmet from "react-helmet";
import Button from "../../Components/Button";
import Form from "../../Components/Form";
import Header from "../../Components/Header";
import Input from "../../Components/Input";
import styled from "../../styled.d";
import PhotoInput from "../../Components/PhotoInput";

const Container = styled.div``;

const ExtendedForm = styled(Form)`
  padding: 0px 40px;
`;

const ExtendedInput = styled(Input)`
  margin-bottom: 30px;
`;

interface IProps {
  firstName: string;
  lastName: string;
  email: string;
  profilePhoto: string;
  age: number;
  password: string;
  onSubmit: any;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  phoneNumber: string;
  uploading: boolean;
  confirmPassword: string;
}

const EmailSignUpPresenter: React.FC<IProps> = ({
  firstName,
  lastName,
  email,
  onSubmit,
  profilePhoto,
  phoneNumber,
  onInputChange,
  uploading,
  age,
  password,
  confirmPassword
}) => (
  <Container>
    <Helmet>
      <title>Email Sign Up | Uber</title>
    </Helmet>
    <Header title={"Email SignUp"} backTo={"/"} />
    <ExtendedForm submitFn={onSubmit}>
      <PhotoInput
          uploading={uploading}
          fileUrl={profilePhoto}
          onChange={onInputChange}
      />
      <ExtendedInput
        onChange={onInputChange}
        type={"text"}
        value={firstName}
        placeholder={"First name"}
        name="firstName"
      />
      <ExtendedInput
        onChange={onInputChange}
        type={"text"}
        value={lastName}
        placeholder={"Last name"}
        name="lastName"
      />
      <ExtendedInput
        onChange={onInputChange}
        type={"email"}
        value={email}
        placeholder={"Email"}
        name="email"
      />
      <ExtendedInput
        onChange={onInputChange}
        type={"password"}
        value={password}
        placeholder={"Password"}
        name="password"
      />
      <ExtendedInput
        onChange={onInputChange}
        type={"password"}
        value={confirmPassword}
        placeholder={"Confirm Password"}
        name="confirmPassword"
      />
      <ExtendedInput
        onChange={onInputChange}
        type={"number"}
        value={age}
        placeholder={"Age"}
        name="age"
      />
      <ExtendedInput
        onChange={onInputChange}
        type={"text"}
        value={phoneNumber}
        placeholder={"Phone Number"}
        name="phoneNumber"
      />
      <Button onClick={null} value={"Sign Up"} type="submit"/>
    </ExtendedForm>
  </Container>
);

export default EmailSignUpPresenter;