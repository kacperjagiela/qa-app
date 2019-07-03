import * as React from 'react';
import { Typography, Layout } from 'antd';
import { searchUser } from '../Reusable/services';
import ProfileShort from '../Reusable/Components/ProfileShort';
import { SearchDiv } from '../Styles';
import { getCookie } from '../Reusable/cookies';

const { Content, Footer } = Layout;

class Search extends React.Component {
	state = {
		users: [],
	}

	componentDidMount() {
		const { match } = this.props;
		const { search } = match.params;
		searchUser(search).then((results) => {
			this.setState({
				users: results.data,
			});
		});
	}

	render() {
		const { users } = this.state;
		const { match, history } = this.props;
		const { search } = match.params;
		const result = users.map(user => (
			<ProfileShort user={user} />
		));
		const LoggedIn = () => (
			<Layout>
				<Content>
					<SearchDiv>
						<Typography.Title level={4} style={{ marginTop: '3vh', textAlign: 'center' }}>
							Results for &apos;
							<b style={{ color: '#1890ff' }}>{search}</b>
							&apos;
						</Typography.Title>
						<div style={{ marginTop: '3vh' }}>
							{result}
						</div>
					</SearchDiv>
				</Content>
				<Footer style={{ width: '100%', textAlign: 'center' }}>
					Created by Kacper Jagieła
				</Footer>
			</Layout>
		);
		const NotLoggedIn = () => {
			history.push('/', { refresh: true });
			return null;
		};
		return (
			getCookie('login') ? <LoggedIn /> : <NotLoggedIn />
		);
	}
}

export default Search;
