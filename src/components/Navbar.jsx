//react stuff
import React, { Fragment, useEffect } from 'react';

//components
import UserDropdown from './UserDropdown';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { toggleSidebar } from '../redux/modules/ui';

//react-router
import { Link } from 'react-router-dom';

//utils
import { routes } from '../utils/constants';

//mui stuff
import { makeStyles, fade } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';

//icons
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';

//styles
const useStyles = makeStyles(theme => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: theme.palette.grey[200],
        boxShadow: 'none',
        borderBottom: `1px solid ${theme.palette.grey[400]}`,
    },
    title: {
        marginRight: theme.spacing(2),
        color: theme.palette.grey[900],
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    menuItems: {
        display: 'flex',
    },
    search: {
        flex: 1,
    },
    sideBarToggle: {
        color: theme.palette.grey[900],
    },
    searchContainer: {
        display: 'flex',
        alignItems: 'center',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.grey[300],
    },
    searchIcon: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: theme.spacing(4),
        color: theme.palette.grey[600],
    },
    searchInput: {
        color: theme.palette.grey[600],
        paddingRight: theme.spacing(4),
    },
    button: {
        color: theme.palette.primary.main,
    },
}));

export default function Navbar() {
    //redux
    const dispatch = useDispatch();
    const {
        user: { authenticated },
    } = useSelector(state => state);

    //react
    const handleToggleSidebar = () => {
        dispatch(toggleSidebar());
    };

    //mui
    const classes = useStyles();

    //routes
    const { HOME, LOGIN, SIGNUP } = routes;

    return (
        <AppBar position='static' className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
                <section className={classes.menuItems}>
                    <IconButton onClick={handleToggleSidebar} className={classes.sideBarToggle}>
                        <MenuIcon />
                    </IconButton>
                    <Button component={Link} to={HOME} className={classes.title}>
                        Contacts
                    </Button>
                </section>
                <section className={classes.search}>
                    <Container maxWidth='sm' className={classes.searchContainer}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase className={classes.searchInput} fullWidth />
                    </Container>
                </section>
                <section className={classes.userButtons}>
                    {authenticated ? (
                        <Fragment>
                            <UserDropdown />
                        </Fragment>
                    ) : (
                        <Fragment>
                            <Button component={Link} to={LOGIN} className={classes.button}>
                                Login
                            </Button>
                            <Button component={Link} to={SIGNUP} className={classes.button}>
                                Signup
                            </Button>
                        </Fragment>
                    )}
                </section>
            </Toolbar>
        </AppBar>
    );
}
