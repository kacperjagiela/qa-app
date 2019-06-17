import * as React from 'react';
import { Layout } from 'antd';
import { Cookies } from 'react-cookie';

const { Content, Footer } = Layout;

const cookies = new Cookies();

const Settings = ({ history }) => {
	if (cookies.get('login')) {
		return (
			<Layout style={{ minHeight: '100vh' }}>
				<Content>
					<h1>Settings content</h1>
				</Content>
				<Footer>
					Created by Kacper Jagieła
				</Footer>
			</Layout>
		);
	}
	history.push('/home');
	return null;
};

export default Settings;
