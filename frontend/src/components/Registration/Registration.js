import * as React from "react";
import "./Registration.css";
import StepOne from "./RegistrationSteps/StepOne"; // eslint-disable-line no-unused-vars
import StepTwo from "./RegistrationSteps/StepTwo"; // eslint-disable-line no-unused-vars
import StepThree from "./RegistrationSteps/StepThree"; // eslint-disable-line no-unused-vars

const inputTypes = ["email", "username", "password", "profilepicture", "description"];

class Registration extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			step: 0,
			email: "",
			username: "",
			password: "",
			profilepicture: "",
			description: ""
		};
		this.getInput = this.getInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.goBack = this.goBack.bind(this);
		this.nextStep = this.nextStep.bind(this);
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

	goBack(){
		this.setState({step:this.state.step-1});
	}
	nextStep(e){
		e.preventDefault();
		this.setState({step:this.state.step+1});
	}
	handleSubmit(){

	}

	render(){
		const steps =[
			<StepOne onChange={this.getInput} value={this.state.email} nextStep={this.nextStep}></StepOne>,
			<StepTwo onChange={this.getInput}></StepTwo>,
			<StepThree onChange={this.getInput} ></StepThree>
		];
		return(
			<div className="registration">
				{steps[this.state.step]}
			</div>
		);
	}
}

export default Registration;