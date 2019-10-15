import React from 'react';
import logo from './logo.svg';
import './App.css';

//pages
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import SignUpPage from './pages/SignUp';
import PageNotFoundPage from './pages/PageNotFound';

//utils
import { routes } from './utils/constants';

//react-router
import { Switch, Route } from 'react-router-dom';

//components
import Navbar from './components/Navbar';

//mui
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
    app: {
        display: 'flex',
        flexDirection: 'column',
    },
});

function App() {
    const classes = useStyles();
    const { HOME, LOGIN, SIGNUP } = routes;
    return (
        <div>
            <Navbar />
            <Switch>
                <Route path={HOME} exact component={HomePage} />
                <Route path={LOGIN} component={LoginPage} />
                <Route path={SIGNUP} component={SignUpPage} />
                <Route component={PageNotFoundPage} />
            </Switch>
        </div>
    );
}

export default App;
