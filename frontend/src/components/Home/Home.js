import * as React from 'react';
import {
	Layout, Input, Typography, AutoComplete, Button, Icon,
} from 'antd';
import { getLatestQuestions, getAllUsernames } from '../Reusable/services';
import { RandomQuestions } from '../Styles';

const { Content, Footer } = Layout;

export default class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			questions: [],
			users: [],
			allUsers: [],
			searchPhrease: '',
		};
		const { refresh, history } = this.props;
		if (history.location.state) {
			refresh();
			history.location.state = undefined;
		}
		this.latestQuestions();
		this.loadAllUsers();
	}

	latestQuestions = async () => {
		await getLatestQuestions().then((res) => {
			this.setState({
				questions: res.data.questions,
				users: res.data.users,
			});
		});
	}

	loadAllUsers = async () => {
		await getAllUsernames().then((res) => {
			let usernames = [];
			const getUsernames = new Promise((resolve) => {
				usernames = res.data.usernames.map(user => user.username);
				resolve('ok');
			});
			getUsernames.then((result) => {
				if (result) {
					this.setState({
						allUsers: usernames,
					});
				}
			});
		});
	}

	onSelect = (value) => {
		const { history } = this.props;
		history.push(`/profile/${value}`);
	}

	onChange = (value) => {
		this.setState({
			searchPhrease: value,
		});
	}

	handleSearch = () => {
		const { history } = this.props;
		const { searchPhrease } = this.state;
		history.push(`/search/${searchPhrease}`);
	}

	render() {
		const { questions, users, allUsers } = this.state;
		return (
			<Layout style={{ minHeight: '100vh' }}>
				<Content style={{ overflow: 'auto' }}>
					<Typography.Title level={3} style={{ marginTop: '10%', textAlign: 'center' }}>
						Search for anyone!
					</Typography.Title>
					<AutoComplete
						className='global-search'
						size='large'
						style={{ width: '60%', marginLeft: '20%' }}
						dataSource={allUsers}
						onSelect={this.onSelect}
						onSearch={this.onChange}
						placeholder='Search for user...'
						filterOption={(inputValue, option) => (
							option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
						)}
					>
						<Input
							suffix={(
								<Button
									className='search-btn'
									style={{ marginRight: -12 }}
									size='large'
									type='primary'
									onClick={this.handleSearch}
								>
									<Icon type='search' />
								</Button>
							)}
						/>
					</AutoComplete>
					<RandomQuestions>
						<Typography.Title level={3} style={{ marginTop: '10vh', textAlign: 'center' }}>
							Some random QA&apos;s
						</Typography.Title>
						{ questions.map((question, index) => (
							question
								? (
									<div style={{ border: '1px solid green' }} key={question.id}>
										<p><a href={`/profile/${users[index].username}`}>{users[index].username}</a></p>
										<p>{question.content}</p>
									</div>
								)
								: null
						))}
					</RandomQuestions>
				</Content>
				<Footer style={{ width: '100%', textAlign: 'center' }}>
					Created by Kacper Jagieła
				</Footer>
			</Layout>
		);
	}
}
