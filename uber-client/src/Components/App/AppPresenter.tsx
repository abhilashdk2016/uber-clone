import React from 'react';
import PropTypes from 'prop-types';
import {
    BrowserRouter,
    Redirect,
    Route,
    Switch
} from 'react-router-dom';
import AddPlace from '../../Routes/AddPlace';
import EditAccount from '../../Routes/EditAccount';
import FindAddress from '../../Routes/FindAddress';
import Home from '../../Routes/Home';
import LoggedOut from '../../Routes/Login';
import PhoneLogin from '../../Routes/PhoneLogin';
import Places from '../../Routes/Places';
import Ride from '../../Routes/Ride';
import Settings from '../../Routes/Settings';
import SocialLogin from '../../Routes/SocialLogin';
import VerifyPhone from '../../Routes/VerifyPhone';

interface IProps {
    isLoggedIn: boolean;
}

const LoggedOutRoutes: React.FC = () => (
    <Switch>
        <Route path="/" exact component={LoggedOut} />
        <Route path="/phone-login" component={PhoneLogin} />
        <Route path="/verify-phone" component={VerifyPhone} />
        <Route path="/social-login" component={SocialLogin} />
        <Redirect from="*" to="/" />
    </Switch>
);

const LoggedInRoutes: React.FC = () => (
    <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/add-place" component={AddPlace} />
        <Route path="/edit-account" component={EditAccount} />
        <Route path="/find-address" component={FindAddress} />
        <Route path="/places" component={Places} />
        <Route path="/ride" component={Ride} />
        <Route path="/settings" component={Settings} />
        <Redirect from="*" to="/" />
    </Switch>
);

const AppPresenter: React.FC<IProps> = ({ isLoggedIn }) => <>
    <BrowserRouter>
        {
            isLoggedIn
            ? <LoggedInRoutes />
            : <LoggedOutRoutes />
        }
    </BrowserRouter>
</>

AppPresenter.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
}

export default AppPresenter;