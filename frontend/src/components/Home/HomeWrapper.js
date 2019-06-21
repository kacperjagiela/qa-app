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
			<Home login={login} refresh={refresh} history={history} />
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
