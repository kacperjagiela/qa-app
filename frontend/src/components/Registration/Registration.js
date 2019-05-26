import * as React from "react";
import "./Registration.css";
import StepOne from "./RegistrationSteps/StepOne"; // eslint-disable-line no-unused-vars
import StepTwo from "./RegistrationSteps/StepTwo"; // eslint-disable-line no-unused-vars
import StepThree from "./RegistrationSteps/StepThree"; // eslint-disable-line no-unused-vars

class Registration extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			step: 1,
			email: "",
			username: "",
			password: "",
			profilepicture: "",
			description: ""
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.nextStep = this.nextStep.bind(this);
		this.saveInput = this.saveInput.bind(this);
	}
	// TODO: figure out why = is unexpected token and rewrite it to anonymous functions
	saveInput(value, key){
		this.setState({[key]:value});
	}

	handleSubmit(){

	}

	nextStep(e){
		e.preventDefault();
		// make sure it's not bigger than array's length
		this.setState({step:this.state.step+1});
	}

	onChange(value, validation){

	}
	
	render(){
		const steps =[
			<StepOne onChange={this.getInput} values={{email: this.state.email}} nextStep={this.nextStep}></StepOne>,
			<StepTwo onChange={this.getInput} username={this.state.username} password={this.state.password}
				nextStep={this.nextStep}></StepTwo>,
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