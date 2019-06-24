import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { getCookie, deleteCookie } from '../Reusable/cookies';


const Logout = ({ history }) => {
	if (getCookie.get('login') && deleteCookie.remove('login')) {
		history.push('/', { refresh: true });
		return null;
	}
	return <Redirect to='/' />;
};

export default Logout;
