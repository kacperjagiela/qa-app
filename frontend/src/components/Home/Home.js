import * as React from 'react';
import {
	Layout, Input, Typography, AutoComplete, Button, Icon, Avatar,
} from 'antd';
import { getLatestQuestions, getAllUsernames, serverIp } from '../Reusable/services';
import { QuestionDiv, Questions } from '../Styles';

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
		console.log(users);
		return (
			<Layout style={{
				minHeight: '100vh', width: '100%', paddingLeft: '10%', paddingRight: '10%', overflow: 'auto',
			}}
			>
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
					<Typography.Title level={3} style={{ marginTop: '10vh', textAlign: 'center' }}>
						Some random QA&apos;s
					</Typography.Title>
					<Questions>
						{ questions.map((question) => {
							if (question) {
								let currentUsername = '';
								users.forEach((user) => {
									if (user.id === question.user_id) {
										currentUsername = user.username;
									}
								});
								return (
									<QuestionDiv key={question.id}>
										<Typography.Paragraph style={{ marginBottom: '0' }}>
											<a href={`/profile/${question.asked_by}`}>
												<Avatar icon='user' size='large' src={`${serverIp}/public/${question.asked_by}`} />
												{` ${question.asked_by} `}
											</a>
											asked:
										</Typography.Paragraph>
										<Typography.Paragraph style={{ textIndent: '50px' }}>
											{question.content}
										</Typography.Paragraph>
										<Typography.Paragraph style={{ marginBottom: '0' }}>
											<a href={`/profile/${currentUsername}`}>
												<Avatar icon='user' size='large' src={`${serverIp}/public/${currentUsername}`} />
												{` ${currentUsername} `}
											</a>
											answered:
										</Typography.Paragraph>
										<Typography.Paragraph style={{ textIndent: '50px' }}>
											{question.answer}
										</Typography.Paragraph>
									</QuestionDiv>
								);
							}
							return null;
						})}
					</Questions>
				</Content>
				<Footer style={{ width: '100%', textAlign: 'center' }}>
					Created by Kacper Jagieła
				</Footer>
			</Layout>
		);
	}
}
