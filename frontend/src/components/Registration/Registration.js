import * as React from "react";
import ".//Registration.css";
import StepOne from "./RegistrationSteps/StepOne"; // eslint-disable-line no-unused-vars
import StepTwo from "./RegistrationSteps/StepTwo"; // eslint-disable-line no-unused-vars
import StepThree from "./RegistrationSteps/StepThree"; // eslint-disable-line no-unused-vars
import styled from "styled-components";


const Div = styled.div`
	width:60vw;
	height:70vh;
	margin-right:120vw;
	border-radius:10px;
	text-align:center;
`;

const inputTypes = ["email", "username", "password", "profilepicture", "description"];

class Registration extends React.Component{
	constructor(){
		super();
		this.state = {
			step: 0,
			email: "",
			username: "",
			password: "",
			profilepicture: "",
			description: "",
			validEmail: "",
			validUsername: "",
			validPassword: "",
			validProfilepicture: " ",
			validDescription: ""
		};
		this.getInput = this.getInput.bind(this);
		this.checkEmail = this.checkEmail.bind(this);
		this.checkUsernameAndPassword = this.checkUsernameAndPassword.bind(this);
	}

	getInput(event){
		event.preventDefault();
		const index = inputTypes.indexOf(event.target.name);
		if(index!==undefined){
			let state = this.state;
			state[inputTypes[index]] = event.target.value;
			this.setState(state);
		}
	}

	checkEmail(){
		
	}
	
	checkUsernameAndPassword(){

	}

	render(){
		const buttons = [
			<button onClick={this.checkEmail}>Next step</button>,
			<button onClick={this.checkEmail}>Next step</button>
		];
		const input1 = <input type="email" onChange={this.getInput} key="email" name="email" value={this.state.email}/>;
		const steps =[
			<StepOne div={Div} input={input1} button={buttons[0]}></StepOne>,
			<StepTwo div={Div} input={input1} button={buttons[1]}></StepTwo>,
			<StepThree div={Div} input={input1}></StepThree>
		];
		return(
			<div className="Registration">
				{steps[this.state.step]}
			</div>
		);
	}
}

export default Registration;