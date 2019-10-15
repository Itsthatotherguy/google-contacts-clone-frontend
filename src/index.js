import React from 'react';
import { render } from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

//react-router
import { BrowserRouter as Router } from 'react-router-dom';

//redux
import configureStore from './redux/configureStore';
import { Provider } from 'react-redux';

const store = configureStore();

const renderApp = () =>
    render(
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>,
        document.getElementById('root')
    );

renderApp();

if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./App', renderApp);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
