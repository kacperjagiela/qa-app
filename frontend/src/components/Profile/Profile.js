import * as React from 'react';
import { Layout, Typography, Button } from 'antd';
import { getCookie } from '../Reusable/cookies';
import { getUserData, getQuestions } from '../Reusable/services';
import { Profilepic, Questions } from '../Styles';
import Question from '../Reusable/Components/Question';

const { Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

export default class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state = { questions: [] };
	}

	componentDidMount() {
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
			});
	}

	render() {
		const { history, match } = this.props;
		const { username, description, questions } = this.state;
		const LoggedIn = () => (
			<Layout style={{
				minHeight: '100vh', width: '100%', paddingLeft: '10%', paddingRight: '10%', overflow: 'auto',
			}}
			>
				<Content style={{
					width: '100%', height: '95vh', paddingTop: '5vh',
				}}
				>
					<a href='https://placeholder.com' style={{ float: 'left', marginRight: '10px' }}><Profilepic src={`http://192.168.8.192:8080/public/${username}`} alt='100x100' /></a>
					<Title level={2}>{username}</Title>
					<Paragraph strong>{description}</Paragraph>
					{getCookie('login') === match.params.username
						? null
						: <Button href={`/ask/${username}`} type='primary' style={{ width: '40%', marginLeft: '30%' }}>Ask question</Button>}
					<Questions>
						{questions.reverse().map(question => (
							<Question
								question={question}
								username={username}
								key={question.id}
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
