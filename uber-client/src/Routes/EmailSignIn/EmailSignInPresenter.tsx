import React from "react";
import Helmet from "react-helmet";
import Button from "../../Components/Button";
import Form from "../../Components/Form";
import Header from "../../Components/Header";
import Input from "../../Components/Input";
import styled from "../../styled.d";

const Container = styled.div``;

const ExtendedForm = styled(Form)`
  padding: 0px 40px;
`;

const ExtendedInput = styled(Input)`
  margin-bottom: 30px;
`;

interface IProps {
  email: string;
  password: string;
  onSubmit: any;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const EmailSignInPresenter: React.FC<IProps> = ({
  email,
  onSubmit,
  onInputChange,
  password
}) => (
  <Container>
    <Helmet>
      <title>Email Sign In | Uber</title>
    </Helmet>
    <Header title={"Email SignUp"} backTo={"/"} />
    <ExtendedForm submitFn={onSubmit}>
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
      /><Button onClick={null} value={"Sign In"} type="submit"/>
    </ExtendedForm>
  </Container>
);

export default EmailSignInPresenter;