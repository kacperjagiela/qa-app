import * as React from 'react';
import {
	Typography, Form, Icon, Input, Button,
} from 'antd';
import { FadeInRight } from '../../Styles';

const { Title } = Typography;

const FormItem = Form.Item;

class StepOneForm extends React.Component {
	handleSubmit = (e) => {
		e.preventDefault();
		const { form, nextStep, saveInput } = this.props;
		form.validateFields((err, value) => {
			if (!err) {
				saveInput({ email: value.email });
				nextStep(e);
			}
		});
	}

	render() {
		const { form } = this.props;
		return (
			<FadeInRight>
				<Form onSubmit={this.handleSubmit}>
					<Title>Sweet! You decided to join!</Title>
					<Title level={3}>Please enter your email.</Title>
					<FormItem label='E-mail' hasFeedback>
						{form.getFieldDecorator('email', {
							rules: [{
								required: true, message: 'Please enter your E-mail!',
							},
							{
								type: 'email', message: 'The input is not valid E-mail!',
							}],
						})(
							<Input prefix={<Icon type='mail' />} style={{ width: '50%' }} placeholder='Email' allowClear />,
						)}
					</FormItem>
					<Button type='primary' htmlType='submit'>Next</Button>
				</Form>
			</FadeInRight>
		);
	}
}

const StepOne = Form.create()(StepOneForm);
export default StepOne;
