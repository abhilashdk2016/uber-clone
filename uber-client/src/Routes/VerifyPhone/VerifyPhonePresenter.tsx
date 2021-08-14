import Helmet from "react-helmet";
import Form from "../../Components/Form";
import Button from "../../Components/Button";
import Header from '../../Components/Header';
import Input from "../../Components/Input";
import styled from "../../styled.d";

const Container = styled.div``;

const ExtendedForm = styled(Form)`
  padding: 0px 40px;
`;

const ExtendedInput = styled(Input)`
  margin-bottom: 20px;
`;
interface IProps {
    verificationKey: string;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onSubmit: any;
    loading: boolean;
  }

const VerifyPhonePresenter: React.FC<IProps> = ({ verificationKey, onInputChange, onSubmit, loading }) => (
    <Container>
    <Helmet>
      <title>Verify Phone | Uber</title>
    </Helmet>
    <Header backTo={"/phone-login"} title={"Verify Phone Number"} />
    <ExtendedForm submitFn={onSubmit}>
      <ExtendedInput
        name="key"
        value={verificationKey}
        placeholder={"Enter Verification Code"}
        onChange={onInputChange}
      />
      <Button disabled={loading} value={loading ? "Verifying" : "Submit"} onClick={null} type="submit" />
    </ExtendedForm>
  </Container>
);

export default VerifyPhonePresenter;