import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

const Logout = ({ history }) => {
	if (cookies.get('login') && cookies.remove('login')) {
		history.push('/', { a: 'b' });
		return null;
	}
	return <Redirect to='/' />;
};

export default Logout;
