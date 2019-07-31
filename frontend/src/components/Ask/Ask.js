import * as React from 'react';
import {
	Form, Layout, Input, Button, Typography,
} from 'antd';
import { withRouter } from 'react-router-dom';
import { getCookie } from '../Reusable/cookies';
import { askQuestion } from '../Reusable/services';
import { LoginDiv } from '../Styles';

const { Content, Footer } = Layout;

class AskForm extends React.Component {
	state = {
		logged: getCookie('login'),
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const { form, history, match } = this.props;
		const { logged } = this.state;
		form.validateFields((err, values) => {
			if (!err) {
				askQuestion(match.params.username, values.questionContent, logged)
					.then((res) => {
						if (res.data) history.push(`/profile/${match.params.username}`);
					})
					.catch(error => error);
			}
		});
	}

	render() {
		const { form, history } = this.props;
		const { pathname } = history.location;
		const { logged } = this.state;
		const username = pathname.substring(pathname.lastIndexOf('/') + 1, pathname.length);
		if (logged) {
			return (
				<Layout>
					<Content>
						<LoginDiv style={{ width: '80%', height: '90%', marginLeft: '10%' }}>
							<Typography.Title level={2} style={{ textAlign: 'center' }}>
								You can ask
								<a href={`/profile/${username}`}>{` ${username} `}</a>
								anything!
							</Typography.Title>
							<Form onSubmit={this.handleSubmit} style={{ width: '100%' }}>
								<Form.Item>
									{form.getFieldDecorator('questionContent')(
										<Input
											suffix={<Button type='primary' htmlType='submit' icon='question' style={{ marginRight: -12 }} />}
											placeholder='Your question here'
										/>,
									)}
								</Form.Item>
							</Form>
						</LoginDiv>
						<Footer style={{ width: '100%', textAlign: 'center' }}>
							Created by Kacper Jagieła
						</Footer>
					</Content>
				</Layout>
			);
		}
		history.push('/home');
		return null;
	}
}

const Ask = withRouter(Form.create({ name: 'ask_form' })(AskForm));

export default Ask;
