import * as React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Registration from '../Registration/Registration';
import Login from '../Login/Login';
import HomeWrapper from '../Home/HomeWrapper';
import Profile from '../Profile/Profile';
import Settings from '../Settings/Settings';
import Logout from './Logout';
import Ask from '../Ask/Ask';
import Search from '../Search/Search';
import Forgot from '../Forgot/Forgot';

const Switcher = ({ refresh }) => (
	<Switch>
		<Route exact path='/ask/:username' component={Ask} />
		<Route exact path='/forgot' component={Forgot} />
		<Route exact path='/settings' component={Settings} />
		<Route exact path='/profile/:username' component={withRouter(Profile)} />
		<Route exact path='/register' component={withRouter(Registration)} />
		<Route exact path='/login' component={Login} />
		<Route exact path='/logout' component={withRouter(Logout)} />
		<Route exact path='/search/:search' component={withRouter(Search)} />
		<Route path='/' render={() => <HomeWrapper refresh={refresh} />} />
	</Switch>
);

export default Switcher;
