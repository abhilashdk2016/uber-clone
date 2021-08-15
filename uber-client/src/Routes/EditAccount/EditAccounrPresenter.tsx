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
  onSubmit: any;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  phoneNumber: string;
  uploading: boolean;
}

const EditAccountPresenter: React.SFC<IProps> = ({
  firstName,
  lastName,
  email,
  onSubmit,
  profilePhoto,
  phoneNumber,
  onInputChange,
  loading,
  uploading
}) => (
  <Container>
    <Helmet>
      <title>Edit Account | Number</title>
    </Helmet>
    <Header title={"Edit Account"} backTo={"/"} />
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
        type={"text"}
        value={phoneNumber}
        placeholder={"Phone Number"}
        name="phoneNumber"
      />
      <Button onClick={null} value={loading ? "Loading" : "Update"} type="submit"/>
    </ExtendedForm>
  </Container>
);

export default EditAccountPresenter;