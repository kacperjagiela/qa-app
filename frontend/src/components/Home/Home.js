import * as React from 'react';
import { Layout, Input } from 'antd';
import { getLatestQuestions } from '../Reusable/services';

const { Content, Footer } = Layout;
const { Search } = Input;

export default class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			questions: [],
			users: [],
		};
		const { refresh, history } = this.props;
		if (history.location.state) {
			refresh();
			history.location.state = undefined;
		}
	}

	componentDidMount() {
		this.latestQuestions();
	}

	latestQuestions = () => {
		getLatestQuestions().then((res) => {
			console.log(res.data);
			this.setState({
				questions: res.data.questions,
				users: res.data.users,
			});
		});
	}

	render() {
		const { questions, users } = this.state;
		return (
			<Layout style={{ minHeight: '100vh' }}>
				<Content>
					<Search
						placeholder='Search for user...'
						onSearch={value => console.log(value)}
						style={{ width: '60%', marginLeft: '20%', marginTop: '10%' }}
						enterButton
						size='large'
					/>
					{ questions.map((question, index) => (
						question
							? (
								<div style={{ border: '1px solid green' }}>
									<p key={users[index].id}><a href={`/profile/${users[index].username}`}>{users[index].username}</a></p>
									<p key={question.id}>{question.content}</p>
								</div>
							)
							: null
					))}
				</Content>
				<Footer style={{ width: '100%', textAlign: 'center' }}>
					Created by Kacper Jagieła
				</Footer>
			</Layout>
		);
	}
}
