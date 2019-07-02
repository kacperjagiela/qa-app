import { removeCookie, getCookie } from '../Reusable/cookies';


const Logout = ({ history }) => {
	if (getCookie('login')) {
		removeCookie('login');
		history.push('/', { refresh: true });
	} else {
		history.push('/', { refresh: true });
	}
	return null;
};

export default Logout;
