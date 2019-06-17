import * as React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Registration from '../Registration/Registration';
import Login from '../Login/Login';
import HomeWrapper from '../Home/HomeWrapper';
import Profile from '../Profile/Profile';
import Settings from '../Settings/Settings';
import Logout from './Logout';

const Switcher = ({ refresh }) => (
	<Switch>
		<Route exact path='/settings' component={withRouter(Settings)} />
		<Route exact path='/profile/:username' component={withRouter(Profile)} />
		<Route exact path='/register' component={withRouter(Registration)} />
		<Route exact path='/login' component={withRouter(Login)} />
		<Route exact path='/logout' component={withRouter(Logout)} />
		<Route path='/' render={() => <HomeWrapper refresh={refresh} />} />
	</Switch>
);

export default Switcher;
