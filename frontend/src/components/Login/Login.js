import * as React from "react";
import "./Login.css";
import { Form, Icon, Input, Button, Checkbox, Typography} from "antd"; // eslint-disable-line no-unused-vars


class LoginForm extends React.Component{
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleSubmit(e){
		e.preventDefault();
		this.props.form.validateFields((err, values)=>{
			if(!err){
				console.log("Received values of form: ", values);
			}
		});
	}

	handleChange(e, key){

	}

	render(){
		const { getFieldDecorator } = this.props.form;
		return(
			<div className="login">
				<Form onSubmit={this.handleSubmit} className="login-form">
					<Typography.Title type={2}>Welcome back!</Typography.Title>
					<Form.Item>
						{getFieldDecorator("username", {
							rules: [{required:true, message: "Please enter your username!"}],
						})(
							<Input prefix={<Icon type="user"/>} placeholder="Username"/>
						)}
					</Form.Item>
					<Form.Item>
						{getFieldDecorator("password", {
							rules: [{required:true, message: "Please enter your password!"}]
						})(
							<Input prefix={<Icon type="lock"/>} type="password" placeholder="Password"/>
						)}
					</Form.Item>
					<Form.Item>
						{getFieldDecorator("remember", {
							valuePropName: "checked",
							initialValue: true,
						})(<Checkbox>Remember me</Checkbox>)}
						<a className="login-form-forgot" href="">
							Forgot password
						</a><br/>
						<Button type="primary" htmlType="submit" className="login-form-button">
							Log in
						</Button>
						Or <a href="">register now!</a>
					</Form.Item>
				</Form>
			</div>
		);
	}
} 

const Login = Form.create({name:"normal_login"})(LoginForm);

export default Login;