import * as React from 'react';
import { Layout } from 'antd';

const { Content, Footer } = Layout;

export default class Home extends React.Component {
	constructor(props) {
		super(props);
		const { refresh } = this.props;
		if (refresh) {
			refresh();
		}
	}

	render() {
		const { login } = this.props;
		return (
			<Layout style={{ minHeight: '100vh' }}>
				<Content>
					<h1>Basic content</h1>
					<h2>{login}</h2>
				</Content>
				<Footer>Created by Kacper Jagieła</Footer>
			</Layout>
		);
	}
}
