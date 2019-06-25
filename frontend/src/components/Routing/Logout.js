import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { getCookie, removeCookie } from '../Reusable/cookies';


const Logout = ({ history }) => {
	if (getCookie('login') && removeCookie('login')) {
		history.push('/', { refresh: true });
		return null;
	}
	return <Redirect to='/' />;
};

export default Logout;
