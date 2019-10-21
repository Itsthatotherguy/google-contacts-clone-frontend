//react stuff
import React, { Fragment } from 'react';

//components
import UserDropdown from './UserDropdown';
import CreateContactButton from './CreateContactButton';

//redux
import { useSelector, useDispatch } from 'react-redux';
// import { toggleSidebar } from '../redux/modules/ui';

//react-router
import { Link } from 'react-router-dom';

//utils
import { routes } from '../utils/constants';

//mui stuff
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';

//styles
const useStyles = makeStyles(theme => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: theme.palette.common.white,
        boxShadow: 'none',
        borderBottom: `1px solid ${theme.palette.grey[400]}`,
        flexGrow: 0,
    },
    title: {
        marginRight: theme.spacing(2),
        color: theme.palette.grey[900],
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
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
    userButtons: {
        display: 'flex',
        alignItems: 'center',
    },
    addButton: {
        marginRight: theme.spacing(2),
    },
}));

export default function Navbar() {
    //redux
    // const dispatch = useDispatch();
    const {
        user: { authenticated },
    } = useSelector(state => state);

    //react
    // const handleToggleSidebar = () => {
    //     dispatch(toggleSidebar());
    // };

    //mui
    const classes = useStyles();

    //routes
    const { LOGIN, SIGNUP } = routes;

    return (
        <AppBar position='static' className={classes.appBar} id='app-bar'>
            <Toolbar className={classes.toolbar}>
                <section className={classes.menuItems}>
                    {/* <IconButton
						onClick={handleToggleSidebar}
						className={classes.sideBarToggle}
					>
						<MenuIcon />
					</IconButton> */}
                    <Typography variant='h6' className={classes.title}>
                        Contacts
                    </Typography>
                </section>
                {/* {authenticated && (
                    <section className={classes.search}>
                        <Container maxWidth='sm' className={classes.searchContainer}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase className={classes.searchInput} fullWidth />
                        </Container>
                    </section>
                )} */}
                <section className={classes.userButtons}>
                    <Hidden smDown>
                        <CreateContactButton className={classes.addButton} />
                    </Hidden>
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
