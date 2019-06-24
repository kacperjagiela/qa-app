import * as React from 'react';
import { Layout, Typography } from 'antd';
import { Cookies } from 'react-cookie';
import axios from 'axios';
import { Profilepic } from '../Styles';

const { Content, Footer } = Layout;
const { Title, Paragraph } = Typography;
const cookie = new Cookies();

export default class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state = { questions: [] };
	}

	componentDidMount() {
		const { match } = this.props;
		// Get profile information from backend
		axios.get(`http://192.168.8.192:8080/profile/${match.params.username}`)
			.then((res) => {
				this.setState({
					username: res.data.username,
					// email: res.data.email,
					description: res.data.description,
					// profilepic: res.data.profilepic,
				});
				// Get questions from backend
				axios.get(`http://192.168.8.192:8080/questions/${res.data.id}`)
					.then((response) => {
						this.setState({ questions: response.data });
					});
			});
	}

	render() {
		const { history } = this.props;
		const { username, description, questions } = this.state;
		const LoggedIn = () => (
			<Layout style={{ minHeight: '100vh' }}>
				<Content style={{
					width: '80vw', paddingLeft: '10vw', height: '95vh', paddingTop: '5vh',
				}}
				>
					<a href='https://placeholder.com' style={{ float: 'left', marginRight: '10px' }}><Profilepic src={`http://192.168.8.192:8080/public/${username}`} alt='100x100' /></a>
					<Title level={2}>{username}</Title>
					<Paragraph strong>{description}</Paragraph>
					<div>
						{questions.map(question => <p key={question.content}>{question.content}</p>)}
					</div>
				</Content>
				<Footer>Created by Kacper Jagieła</Footer>
			</Layout>
		);
		const NotLoggedIn = () => {
			history.push('/home', { refresh: true });
			return null;
		};
		return (
			cookie.get('login') ? <LoggedIn /> : <NotLoggedIn />
		);
	}
}
