import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { getCookie } from '../Reusable/cookies';
import Home from './Home';
import WelcomePage from '../WelcomePage/WelcomePage';

class HomeWrapper extends React.Component {
	state = {
		login: getCookie('login'),
	};

	componentDidMount() {
		const { history, refresh } = this.props;
		if (history.action === 'REPLACE') {
			history.action = 'PUT';
			refresh();
		}
	}

	render() {
		const { login } = this.state;
		const { refresh, history } = this.props;
		const LoggedIn = () => (
			<Home refresh={refresh} history={history} />
		);
		const NotLoggedIn = () => (
			<WelcomePage refresh={refresh} history={history} />
		);
		return (
			login ? <LoggedIn /> : <NotLoggedIn />
		);
	}
}
export default withRouter(HomeWrapper);
