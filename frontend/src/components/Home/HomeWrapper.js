import * as React from 'react';
import { Cookies } from 'react-cookie';
import { withRouter } from 'react-router-dom';
import Home from './Home';
import WelcomePage from '../WelcomePage/WelcomePage';

const cookies = new Cookies();

class HomeWrapper extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			login: cookies.get('login'),
		};
	}

	componentDidMount() {
		const { location, refresh } = this.props;
		if (location.state) {
			refresh();
		}
	}

	render() {
		const { login } = this.state;
		const { refresh } = this.props;
		if (login) {
			return (
				<Home login={login} refresh={refresh} />
			);
		} return (
			<WelcomePage refresh={refresh} />
		);
	}
}
export default withRouter(HomeWrapper);
