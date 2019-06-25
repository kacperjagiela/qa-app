import * as React from 'react';
import { Layout } from 'antd'; // eslint-disable-line no-unused-vars
import NavigationSider from '../Reusable/Components/NavigationSider'; // eslint-disable-line no-unused-vars
import Switcher from '../Routing/Switcher'; // eslint-disable-line no-unused-vars
import { getCookie } from '../Reusable/cookies';

export default class AppWrapper extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			login: getCookie('login'),
			current: 1,
		};
	}

	handleChange = (e) => {
		this.setState({ current: e.key });
	}

	refresh = () => {
		this.setState({ login: getCookie('login'), current: 1 });
	}

	render() {
		const { login, current } = this.state;
		const LoggedIn = () => (
			<Layout style={{ minHeight: '100vh', maxHeight: '100vh' }}>
				<NavigationSider
					handleChange={this.handleChange}
					selected={current.toString()}
					login={login}
				/>
				<Switcher refresh={this.refresh} />
			</Layout>
		);
		const NotLoggedIn = () => (
			<Layout style={{ minHeight: '100vh', maxHeight: '100vh' }}>
				<Switcher refresh={this.refresh} />
			</Layout>
		);
		return (
			login ? <LoggedIn /> : <NotLoggedIn />
		);
	}
}
