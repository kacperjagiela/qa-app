import * as React from "react";
import { Typography, Form, Icon, Input, Button } from "antd"; // eslint-disable-line no-unused-vars
const { Title } = Typography; // eslint-disable-line no-unused-vars
import {FadeInRight} from "../../Styles"; // eslint-disable-line no-unused-vars

const FormItem = Form.Item; // eslint-disable-line no-unused-vars

class StepOneForm extends React.Component{
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleSubmit(e){
		e.preventDefault();
		this.props.form.validateFields(err=>{
			if(!err){
				this.props.nextStep(e);
			}
		});
	}
	render(){
		const { getFieldDecorator } = this.props.form;
		return(
			<FadeInRight>
				<Form onSubmit={this.handleSubmit}>
					<Title>Sweet! You decided to join!</Title>
					<Title level={3}>Please enter your email.</Title>
					<FormItem label="E-mail" hasFeedback>
						{getFieldDecorator("email", {
							rules:[{
								required: true, message: "Please enter your E-mail!" 
							}
							,{
								type: "email", message: "The input is not valid E-mail!",
							}]
						})(
							<Input prefix={<Icon type="mail" />} style={{width:"50%"}} placeholder="Email" onChange={e=>this.props.onChange(e, "email")}/>
						)}
					</FormItem>
					<Button type="primary" htmlType="submit">Next</Button>
				</Form>
			</FadeInRight>
		);
	}
}

const StepOne = Form.create()(StepOneForm);
export default StepOne;