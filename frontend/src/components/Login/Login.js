import * as React from "react";
import "./Login.css";
import { Form, Icon, Input, Button, Checkbox, Typography} from "antd"; // eslint-disable-line no-unused-vars
import axios from "axios";
import {withRouter} from "react-router-dom";
import { Cookies } from "react-cookie";

const cookie = new Cookies();

class LoginForm extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			username: "",
			password: "",
			remember: true
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e){
		e.preventDefault();
		this.props.form.validateFields((err, values)=>{
			if(!err){
				this.setState(values, ()=>{
					axios.post("http://192.168.8.192:8080/login", {data:this.state} ,{withCredentials: true})
						.then((res)=>{
							if(res.data==="Logged in"){
								this.props.history.push("/home");
							}
						})
						.catch(err=>{
							return err;
						});
				});
			}
		});
	}

	render(){
		const { getFieldDecorator } = this.props.form;
		if(cookie.get("login")){
			this.props.history.push("/home");
			return null;
		}else{
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
} 

const Login = withRouter(Form.create({name:"normal_login"})(LoginForm));

export default Login;