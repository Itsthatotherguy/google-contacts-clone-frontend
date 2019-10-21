//react
import React, { useState } from 'react';

//react-router
import { Link as RouterLink } from 'react-router-dom';

//redux
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../redux/modules/user';

//mui stuff
import makeStyles from '@material-ui/core/styles/makeStyles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';

//utils
import logo from '../logo.svg';
import { routes } from '../utils/constants';

const useStyles = makeStyles(theme => ({
    container: {
        margin: '2rem auto',
        display: 'flex',
        alignItems: 'center',
    },
    paper: {
        textAlign: 'center',
        padding: theme.spacing(3),
    },
    image: {
        width: 100,
    },
    title: {
        marginBottom: '1rem',
    },
    textField: { marginBottom: '1rem' },
    wrapper: {
        position: 'relative',
        marginBottom: '1rem',
    },
    progressIndicator: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}));

//TODO sign in with google
//TODO sign in with facebook

export default function Login({ history }) {
    //redux
    const dispatch = useDispatch();
    const {
        user: { isLoading, errors },
    } = useSelector(state => state);

    //react
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = e => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = e => {
        setPassword(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();

        const userDetails = {
            email,
            password,
        };

        dispatch(loginUser(userDetails, history));
    };

    //mui
    const classes = useStyles();
    return (
        <Container maxWidth='xs' className={classes.container}>
            <Paper className={classes.paper}>
                <img src={logo} alt='group-of-people-icon' className={classes.image} />
                <Typography variant='h2' className={classes.title}>
                    Login
                </Typography>
                <TextField
                    variant='outlined'
                    label='Email'
                    type='text'
                    fullWidth
                    className={classes.textField}
                    value={email}
                    onChange={handleEmailChange}
                    error={!!errors.email}
                    helperText={errors.email ? errors.email : ''}
                />
                <TextField
                    variant='outlined'
                    label='Password'
                    type='password'
                    fullWidth
                    className={classes.textField}
                    value={password}
                    onChange={handlePasswordChange}
                    error={!!errors.password}
                    helperText={errors.password ? errors.password : ''}
                />
                <div className={classes.wrapper}>
                    <Button
                        variant='contained'
                        color='primary'
                        className={classes.button}
                        onClick={handleSubmit}
                        disabled={isLoading}>
                        Login
                    </Button>
                    {isLoading && (
                        <CircularProgress size={24} className={classes.progressIndicator} />
                    )}
                </div>

                <Typography variant='body2'>
                    Don't have an account? Sign up{' '}
                    <Link component={RouterLink} to={routes.SIGNUP}>
                        here
                    </Link>
                </Typography>
            </Paper>
        </Container>
    );
}
