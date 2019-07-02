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
			console.log(res);
		});
	}

	render() {
		const { questions, users } = this.state;
		const { login } = this.props;
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
					{ questions.map(question => (
						<p key={question.id}>h1</p>
					))}
				</Content>
				<Footer style={{ width: '100%', textAlign: 'center' }}>
					Created by Kacper Jagieła
				</Footer>
			</Layout>
		);
	}
}
