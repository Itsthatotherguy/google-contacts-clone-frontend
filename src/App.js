//react
import React from 'react';

//redux
import { useSelector } from 'react-redux';

//pages
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import SignUpPage from './pages/SignUp';
import PageNotFoundPage from './pages/PageNotFound';
import ViewContact from './pages/ViewContact';
import EditContact from './pages/EditContact';

//react-router
import { Switch, Route, Redirect } from 'react-router-dom';

//components
import Navbar from './components/Navbar';
import AuthRoute from './components/AuthRoute';
import Sidebar from './components/Sidebar';

//mui
import makeStyles from '@material-ui/core/styles/makeStyles';

//utils
import './App.css';
import { routes, styleConstants } from './utils/constants';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
	app: {
		display: 'flex',
		flexDirection: 'column',
		backgroundColor: theme.palette.grey[200],
		height: '100vh',
	},
	root: {
		display: 'flex',
		flexGrow: 1,
	},
	contentArea: {
		flexGrow: 1,
		// marginLeft: -styleConstants.drawerWidth,
		// transition: theme.transitions.create('margin', {
		//     easing: theme.transitions.easing.sharp,
		//     duration: theme.transitions.duration.leavingScreen,
		// }),
		display: 'flex',
	},
	contentAreaShift: {
		marginLeft: 0,
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
}));

function App() {
	const {
		user: { authenticated },
		ui: { sidebarOpen },
	} = useSelector(state => state);

	const classes = useStyles();
	const { HOME, LOGIN, SIGNUP, VIEW_CONTACT, EDIT_CONTACT } = routes;
	return (
		<div className={classes.app}>
			{/* <Navbar /> */}
			<div className={classes.root}>
				{/* <Sidebar /> */}
				<main
					className={clsx(classes.contentArea, {
						[classes.contentAreaShift]: sidebarOpen,
					})}
				>
					<Switch>
						<Route
							path={HOME}
							exact
							render={() =>
								authenticated ? (
									<HomePage />
								) : (
									<Redirect to={LOGIN} />
								)
							}
						/>
						<Route
							path={VIEW_CONTACT}
							exact
							render={() =>
								authenticated ? (
									<ViewContact />
								) : (
									<Redirect to={LOGIN} />
								)
							}
						/>
						<Route
							path={EDIT_CONTACT}
							exact
							render={() =>
								authenticated ? (
									<EditContact />
								) : (
									<Redirect to={LOGIN} />
								)
							}
						/>
						<AuthRoute path={LOGIN} component={LoginPage} />
						<AuthRoute path={SIGNUP} component={SignUpPage} />
						<Route component={PageNotFoundPage} />
					</Switch>
				</main>
			</div>
		</div>
	);
}

export default App;
