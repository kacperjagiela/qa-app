import * as React from 'react';
import {
	Form, Layout, Input, Icon, Button,
} from 'antd';
import { withRouter } from 'react-router-dom';
import { getCookie } from '../Reusable/cookies';
import { askQuestion } from '../Reusable/services';

const { Content } = Layout;

class AskForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			logged: getCookie('login'),
		};
	}

	handleSubmit = (e) => {
		e.preventDefault();
		const { form, history, match } = this.props;
		form.validateFields((err, values) => {
			if (!err) {
				askQuestion(match.params.username, values.questionContent)
					.then((res) => {
						if (res.data) history.push(`/profile/${match.params.username}`);
					})
					.catch(error => error);
			}
		});
	}

	render() {
		const { form, history } = this.props;
		const { logged } = this.state;
		if (logged) {
			return (
				<Layout>
					<Content>
						<Form onSubmit={this.handleSubmit}>
							<Form.Item>
								{form.getFieldDecorator('questionContent')(
									<Input prefix={<Icon type='question' />} placeholder='Your question here' />,
								)}
								<Button type='primary' htmlType='submit'>
									Ask question!
								</Button>
							</Form.Item>
						</Form>
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
