import * as React from 'react';
import { Cookies } from 'react-cookie';
import { withRouter } from 'react-router-dom';
import Home from './Home';
import WelcomePage from '../WelcomePage/WelcomePage';

const cookies = new Cookies();

class HomeWrapper extends React.Component {
	state = {
		login: cookies.get('login'),
	};

	render() {
		const { login } = this.state;
		const { refresh } = this.props;
		const LoggedIn = () => (
			<Home login={login} refresh={refresh} />
		);
		const NotLoggedIn = () => (
			<WelcomePage refresh={refresh} />
		);
		return (
			login ? <LoggedIn /> : <NotLoggedIn />
		);
	}
}
export default withRouter(HomeWrapper);
