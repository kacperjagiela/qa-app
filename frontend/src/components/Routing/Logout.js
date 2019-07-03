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
	remove().then((res) => {
		console.log(res);
		if (res === 'ok') {
			history.push('/', { refresh: true });
		} else {
			history.push('/logout');
		}
	});
	return null;
};

export default Logout;
