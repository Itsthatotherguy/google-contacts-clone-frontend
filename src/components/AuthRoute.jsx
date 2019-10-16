//react
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

//redux
import { useSelector } from 'react-redux';

//utils
import { routes } from '../utils/constants';

export default function({ component: Component, ...rest }) {
    const { authenticated } = useSelector(state => state.user);
    return (
        <Route
            {...rest}
            render={props =>
                authenticated ? <Redirect to={routes.HOME} /> : <Component {...props} />
            }
        />
    );
}
