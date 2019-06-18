import * as React from 'react';
import './Login.css';
import {
	Form, Icon, Input, Button, Checkbox, Typography,
} from 'antd';
import { withRouter } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import { login } from '../Reusable/services';

const cookie = new Cookies();

class LoginForm extends React.Component {
	handleSubmit = (e) => {
		e.preventDefault();
		const { form, history } = this.props;
		form.validateFields((err, values) => {
			if (!err) {
				login(values)
					.then((res) => {
						if (res.data === 'Logged in') {
							history.push('/home');
						}
					})
					.catch(error => (error));
			}
		});
	}

	render() {
		const { form, history } = this.props;
		const LoggedIn = () => {
			history.push('/home');
			return null;
		};
		const NotLoggedIn = () => (
			<div className='login'>
				<Form onSubmit={this.handleSubmit} className='login-form'>
					<Typography.Title type={2}>Welcome back!</Typography.Title>
					<Form.Item>
						{form.getFieldDecorator('username', {
							rules: [{ required: true, message: 'Please enter your username!' }],
						})(
							<Input prefix={<Icon type='user' />} placeholder='Username' />,
						)}
					</Form.Item>
					<Form.Item>
						{form.getFieldDecorator('password', {
							rules: [{ required: true, message: 'Please enter your password!' }],
						})(
							<Input prefix={<Icon type='lock' />} type='password' placeholder='Password' />,
						)}
					</Form.Item>
					<Form.Item>
						{form.getFieldDecorator('remember', {
							valuePropName: 'checked',
							initialValue: true,
						})(<Checkbox>Remember me</Checkbox>)}
						<a className='login-form-forgot' href='/forgot'>
							Forgot password
						</a>
						<br />
						<Button type='primary' htmlType='submit' className='login-form-button'>
							Log in
						</Button>
						Or
						<a href='/register'> register now!</a>
					</Form.Item>
				</Form>
			</div>
		);
		return (
			cookie.get('login') ? <LoggedIn /> : <NotLoggedIn />
		);
	}
}

const Login = withRouter(Form.create({ name: 'normal_login' })(LoginForm));

export default Login;
