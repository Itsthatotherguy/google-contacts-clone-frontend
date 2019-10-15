//react stuff
import React, { useEffect } from 'react';

//redux stuff
import { useSelector, useDispatch } from 'react-redux';

//react-router
import { Link } from 'react-router-dom';

//utils
import { routes } from '../utils/constants';

//mui stuff
import makeStyles from '@material-ui/core/styles/makeStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

//styles
const useStyles = makeStyles(theme => ({
    title: {
        flexGrow: 1,
    },
}));

export default function Navbar() {
    //redux
    // const { }
    const dispatch = useDispatch();

    //react
    useEffect(() => {}, []);

    //mui
    const classes = useStyles();

    //routes
    const { HOME, LOGIN, SIGNUP } = routes;

    return (
        <AppBar position='static'>
            <Toolbar>
                <Button color='inherit' component={Link} to={HOME}>
                    Home
                </Button>
                <Button color='inherit' component={Link} to={LOGIN}>
                    Login
                </Button>
                <Button color='inherit' component={Link} to={SIGNUP}>
                    Signup
                </Button>
            </Toolbar>
        </AppBar>
    );
}
