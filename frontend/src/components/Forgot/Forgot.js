import * as React from 'react';
import { withRouter } from 'react-router-dom';
import {
	Form, Icon, Input, Button, Typography, Alert,
} from 'antd';
import { LoginDiv } from '../Styles';
import { getCookie } from '../Reusable/cookies';
import { generatePassword } from '../Reusable/services';

class ForgotForm extends React.Component {
	state = {
		logged: getCookie('login'),
		alertVisible: false,
	}

	handleSubmit = (e) => {
		const { form } = this.props;
		e.preventDefault();
		form.validateFields((err, values) => {
			generatePassword(values.username, values.email)
				.then((result) => {
					if (result) {
						this.setState({
							alertVisible: true,
						});
					}
				});
		});
	}

	onClose = () => {
		const { history } = this.props;
		history.push('/login');
	}

	render() {
		const { logged, alertVisible } = this.state;
		const { form, history } = this.props;
		if (logged) {
			history.push('/');
			return null;
		}
		return (
			<LoginDiv>
				<Typography.Title level={2}>
					Forgot your password?
				</Typography.Title>
				<Alert
					message='Email send!'
					description='If user with such username and email exist we send you an email.'
					type='info'
					closable
					onClose={this.onClose}
					style={
						alertVisible
							? {
								visibility: 'visible', position: 'absolute', top: '40vh', width: '60%', maringLeft: '20%', zIndex: 3,
							}
							: {
								visibility: 'hidden', position: 'absolute', top: '40vh', width: '60%', maringLeft: '20%', zIndex: 3,
							}}
				/>
				<Typography.Title level={4}>
					Generate a new one!
				</Typography.Title>
				<Form onSubmit={this.handleSubmit}>
					<Form.Item>
						{form.getFieldDecorator('email', {
							rules: [
								{
									required: true, message: 'Please enter your email',
								},
								{
									type: 'email', message: 'The input is not valid E-mail!',
								}],
						})(
							<Input prefix={<Icon type='mail' />} placeholder='Email' allowClear />,
						)}
					</Form.Item>
					<Form.Item>
						{form.getFieldDecorator('username', {
							rules: [
								{
									required: true, message: 'Please enter your username',
								}],
						})(
							<Input prefix={<Icon type='user' />} placeholder='Username' allowClear />,
						)}
					</Form.Item>
					<Button type='primary' htmlType='submit'>Generate new password</Button>
				</Form>
			</LoginDiv>
		);
	}
}

const Forgot = withRouter(Form.create({ name: 'forgot' })(ForgotForm));

export default Forgot;
