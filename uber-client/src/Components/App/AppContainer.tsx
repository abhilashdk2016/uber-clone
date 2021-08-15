//import { gql, useQuery } from "@apollo/react-hooks";
import AppPresenter from './AppPresenter';
import { ThemeProvider } from '../../styled.d';
import theme from '../../theme';
import GlobalStyle from '../../global-styles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { gql, useQuery } from '@apollo/react-hooks';

const IS_LOGGED_IN = gql`
    query getAuth {
    isLoggedIn @client
}
`;

const AppContainer = () => {
    const { data } = useQuery(IS_LOGGED_IN);
    let isLoggedIn = data.isLoggedIn;
    if(data.isLoggedIn === false && localStorage.getItem("jwt")) {
        isLoggedIn = true;
    }
    return <>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
            <AppPresenter isLoggedIn={isLoggedIn} />
        </ThemeProvider>
        <ToastContainer draggable position={"bottom-center"}/>
    </>;
}


export default AppContainer;