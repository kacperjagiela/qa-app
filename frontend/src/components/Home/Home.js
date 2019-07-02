import * as React from 'react';
import { Layout, Input, Typography } from 'antd';
import { getLatestQuestions } from '../Reusable/services';
import { RandomQuestions } from '../Styles';

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
			this.setState({
				questions: res.data.questions,
				users: res.data.users,
			});
		});
	}

	handleSearch = (value) => {
		const { history } = this.props;
		history.push(`/search/${value}`);
	}

	render() {
		const { questions, users } = this.state;
		return (
			<Layout style={{ minHeight: '100vh' }}>
				<Content style={{ overflow: 'auto' }}>
					<Typography.Title level={3} style={{ marginTop: '10%', textAlign: 'center' }}>
						Search for anyone!
					</Typography.Title>
					<Search
						placeholder='Search for user...'
						onSearch={value => this.handleSearch(value)}
						style={{ width: '60%', marginLeft: '20%' }}
						enterButton
						size='large'
					/>
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
