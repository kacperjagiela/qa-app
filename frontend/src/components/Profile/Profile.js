import * as React from 'react';
import {
	Layout, Typography, Button, Avatar,
} from 'antd';
import { compare } from '../Reusable/functions';
import { getCookie } from '../Reusable/cookies';
import {
	getUserData, getQuestions, serverIp, checkForAvatar,
} from '../Reusable/services';
import { Profilepic, Questions } from '../Styles';
import Question from '../Reusable/Components/Question';

const { Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

export default class Profile extends React.Component {
	state = {
		questions: [],
	};

	componentDidMount() {
		this.refresh();
	}

	refresh = () => {
		const { match } = this.props;
		// Get profile information from backend
		getUserData(match.params.username)
			.then((res) => {
				this.setState({
					username: res.data.username,
					// email: res.data.email,
					description: res.data.description,
					// profilepic: res.data.profilepic,
				});
				// Get questions from backend
				getQuestions(res.data.id)
					.then((response) => {
						this.setState({ questions: response.data });
					});
				checkForAvatar(res.data.username)
					.then((result) => {
						this.setState({
							avatar: result.data,
						});
					});
			});
	}

	render() {
		const { history, match } = this.props;
		const {
			avatar, username, description, questions,
		} = this.state;
		const LoggedIn = () => (
			<Layout style={{
				minHeight: '100vh', width: '100%', paddingLeft: '10%', paddingRight: '10%', overflow: 'auto',
			}}
			>
				<Content style={{
					width: '100%', height: '95vh', paddingTop: '5vh',
				}}
				>
					<div style={{ marginBottom: '100px' }}>
						<a href={`/profile/${username}`} style={{ float: 'left', marginRight: '10px' }}>
							{
								avatar
									? <Profilepic src={`${serverIp}/public/${username}`} alt='100x100' style={{ zIndex: 2 }} />
									: <Avatar icon='user' size={80} style={{ zIndex: 2 }} />
							}
						</a>
						<Title level={2}>{username}</Title>
						{
							description !== undefined
								? <Paragraph style={{ whiteSpace: 'pre' }} strong>{description}</Paragraph>
								: null
						}
					</div>
					{getCookie('login') === match.params.username
						? null
						: <Button href={`/ask/${username}`} type='primary'>Ask this user</Button>}
					<Questions>
						{questions.sort(compare).reverse().map(question => (
							<Question
								question={question}
								refresh={this.refresh}
								username={username}
								key={question.id}
								id={question.id}
							/>
						))}
					</Questions>
					<Footer style={{ width: '100%', textAlign: 'center' }}>
						Created by Kacper Jagieła
					</Footer>
				</Content>
			</Layout>
		);
		const NotLoggedIn = () => {
			history.push('/home');
			return null;
		};
		return (
			getCookie('login') ? <LoggedIn /> : <NotLoggedIn />
		);
	}
}
