import * as React from 'react';
import { Layout, Menu, Icon } from 'antd'; // eslint-disable-line no-unused-vars
import { Cookies } from 'react-cookie';
import NavigationSider from '../Reusable/NavigationSider'; // eslint-disable-line no-unused-vars
import Switcher from '../Routing/Switcher'; // eslint-disable-line no-unused-vars

const cookies = new Cookies();

export default class AppWrapper extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			login: cookies.get('login'),
			current: 1,
		};
	}

	handleChange = (e) => {
		this.setState({ current: e.key });
	}

	refresh = () => {
		this.setState({ login: cookies.get('login'), current: 1 });
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
