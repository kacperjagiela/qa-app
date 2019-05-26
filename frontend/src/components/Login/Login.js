import * as React from "react";
import "./Login.css";
import { InputText,  } from "../Styles"; // eslint-disable-line no-unused-vars

class Login extends React.Component{
	render(){
		return(
			<div className="login">
				<h1>Login to application</h1>
				<InputText placeholder="Username"/><br></br>
				<InputText placeholder="Password"/>
			</div>
		);
	}
} 

export default Login;