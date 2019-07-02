import * as React from 'react';
import { Layout } from 'antd'; // eslint-disable-line no-unused-vars
import { withRouter } from 'react-router-dom';
import NavigationSider from '../Reusable/Components/NavigationSider'; // eslint-disable-line no-unused-vars
import Switcher from '../Routing/Switcher'; // eslint-disable-line no-unused-vars
import { getCookie } from '../Reusable/cookies';

class AppWrapper extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			login: getCookie('login'),
		};
	}

	refresh = () => {
		this.setState({ login: getCookie('login') });
	}

	render() {
		const { history } = this.props;
		const { login } = this.state;
		const { pathname } = history.location;
		let subPath = '';
		if (pathname.indexOf('/') === pathname.lastIndexOf('/')) {
			subPath = pathname.replace('/', '');
		} else {
			subPath = pathname.substring(pathname.indexOf('/') + 1, pathname.lastIndexOf('/'));
		}
		const LoggedIn = () => (
			<Layout style={{ minHeight: '100vh', maxHeight: '100vh' }}>
				<NavigationSider
					selected={subPath}
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
const AppWrapperWithRouter = withRouter(AppWrapper);

export default AppWrapperWithRouter;
