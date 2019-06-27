import { removeCookie } from '../Reusable/cookies';


const Logout = ({ history }) => {
	removeCookie('login');
	history.push('/', { refresh: true });
	return null;
};

export default Logout;
