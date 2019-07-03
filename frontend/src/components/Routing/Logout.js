import { removeCookie, getCookie } from '../Reusable/cookies';


const Logout = ({ history }) => {
	const remove = () => (
		new Promise((resolve, reject) => {
			removeCookie('login');
			if (getCookie('login') === undefined) {
				resolve('ok');
			} else {
				reject();
			}
		})
	);
	remove().then((res) => {
		if (res) history.push('/', { refresh: true });
	});
	return null;
};

export default Logout;
