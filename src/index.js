import React from 'react';
import { render } from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

//react-router
import { BrowserRouter as Router } from 'react-router-dom';

//redux
import configureStore from './redux/configureStore';
import { Provider } from 'react-redux';
import {
	logoutUser,
	setAuthenticated,
	getUserData,
} from './redux/modules/user';

//mui
import { ThemeProvider } from '@material-ui/core/styles';

//utils
import jwtDecode from 'jwt-decode';
import axios from 'axios';

const theme = {};

const store = configureStore();

const renderApp = () => {
	render(
		<Provider store={store}>
			<Router>
				<App />
			</Router>
		</Provider>,
		document.getElementById('root')
	);
};

const getToken = () => {
	return new Promise((resolve, reject) => {
		try {
			const token = localStorage.FBIdToken;
			resolve(token);
		} catch (err) {
			reject(null);
		}
	});
};

getToken().then(token => {
	console.log(token);

	if (token) {
		const decodedToken = jwtDecode(token);
		if (decodedToken.exp * 1000 > Date.now()) {
			store.dispatch(setAuthenticated());
			axios.defaults.headers.common['Authorization'] = token;
			store.dispatch(getUserData());
		} else {
			store.dispatch(logoutUser());
		}
	}

	renderApp();
});

if (process.env.NODE_ENV !== 'production' && module.hot) {
	module.hot.accept('./App', renderApp);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
