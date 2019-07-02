import * as React from 'react';
import { Typography } from 'antd';
import { searchUser } from '../Reusable/services';
import ProfileShort from '../Reusable/Components/ProfileShort';
import { SearchDiv } from '../Styles';

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
		const { match } = this.props;
		const { search } = match.params;
		const result = users.map(user => (
			<ProfileShort key={user.id} user={user} />
		));
		return (
			<SearchDiv>
				<Typography.Title level={4} style={{ marginTop: '3vh', textAlign: 'center' }}>
					Results for &apos;
					<b style={{ color: '#1890ff' }}>{search}</b>
					&apos;
				</Typography.Title>
				{result}
			</SearchDiv>
		);
	}
}

export default Search;
