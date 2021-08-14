import { gql, useQuery } from "@apollo/react-hooks";
import AppPresenter from './AppPresenter';
import { ThemeProvider } from '../../styled.d';
import theme from '../../theme';
import GlobalStyle from '../../global-styles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const IS_LOGGED_IN = gql`
    query getAuth {
    isLoggedIn @client
}
`;

const AppContainer = (props) => {
    const { data } = useQuery(IS_LOGGED_IN);
    return <>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
            <AppPresenter isLoggedIn={data.isLoggedIn} />
        </ThemeProvider>
        <ToastContainer draggable position={"bottom-center"}/>
    </>;
}


export default AppContainer;