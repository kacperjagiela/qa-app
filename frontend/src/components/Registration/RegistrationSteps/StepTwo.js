import * as React from 'react';
import {
	Typography, Form, Icon, Input, Button,
} from 'antd';
import { FadeInRight } from '../../Styles';

const { Title } = Typography;
const FormItem = Form.Item;

class StepTwoForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			confirmDirty: false,
		};
	}

	checkPassword = (rule, value, callback) => {
		const { form } = this.props;
		const { confirmDirty } = this.state;
		if (value && confirmDirty && value.length >= 8) {
			form.validateFields(['confirm'], { force: true });
		}
		callback();
	}

	checkConfirm = (rule, value, callback) => {
		const { form } = this.props;
		if (value && value !== form.getFieldValue('password')) {
			callback('Two passwords that you enter is inconsistent!');
		}
		callback();
	}

	handleConfirmBlur = (e) => {
		const { value } = e.target.value;
		const { confirmDirty } = this.state;
		this.setState({ confirmDirty: confirmDirty || !!value });
	}

	handleSubmit = (e) => {
		e.preventDefault();
		const { form, nextStep, saveInput } = this.props;
		form.validateFields((err, values) => {
			if (!err) {
				saveInput({
					username: values.username,
					password: values.password,
				});
				nextStep(e);
			}
		});
	}

	render() {
		const { form, prevStep } = this.props;
		return (
			<FadeInRight>
				<Form onSubmit={this.handleSubmit}>
					<Title>Just a little bit more!</Title>
					<Title level={3}>Please enter your username and password.</Title>
					<FormItem label='Username' hasFeedback>
						{form.getFieldDecorator('username', {
							rules: [{
								required: true, message: 'Please enter your username!',
							}],
						})(
							<Input prefix={<Icon type='user' />} style={{ width: '50%' }} placeholder='Username' allowClear />,
						)}
					</FormItem>
					<FormItem label='Password' hasFeedback>
						{form.getFieldDecorator('password', {
							rules: [{
								required: true, message: 'Please enter your password! (at least 8 characters)', min: 8,
							}, {
								validator: this.checkPassword,
							}],
						})(
							<Input prefix={<Icon type='lock' />} type='password' style={{ width: '50%' }} placeholder='Password' allowClear />,
						)}
					</FormItem>
					<FormItem label='Confirm Password' hasFeedback>
						{form.getFieldDecorator('confirm', {
							rules: [{
								required: true, message: 'Please confirm your password!',
							}, {
								validator: this.checkConfirm,
							}],
						})(
							<Input prefix={<Icon type='lock' />} type='password' style={{ width: '50%' }} placeholder='Confirm password' onBlur={this.handleConfirmBlur} allowClear />,
						)}
					</FormItem>
					<Button onClick={prevStep}>Previous</Button>
					<Button type='primary' htmlType='submit'>Next</Button>
				</Form>
			</FadeInRight>
		);
	}
}

const StepTwo = Form.create()(StepTwoForm);
export default StepTwo;
