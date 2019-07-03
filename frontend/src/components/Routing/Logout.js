import { removeCookie, getCookie } from '../Reusable/cookies';


const Logout = ({ history }) => {
	const remove = () => (
		new Promise((resolve) => {
			removeCookie('login');
			if (getCookie('login') === undefined) {
				resolve('ok');
			}
		})
	);
	remove().then(() => {
		history.push('/', { refresh: true });
	});
	return null;
};

export default Logout;
