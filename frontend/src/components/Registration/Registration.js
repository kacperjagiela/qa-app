import * as React from "react";
import "./Registration.css";
import StepOne from "./RegistrationSteps/StepOne"; // eslint-disable-line no-unused-vars
import StepTwo from "./RegistrationSteps/StepTwo"; // eslint-disable-line no-unused-vars
import StepThree from "./RegistrationSteps/StepThree"; // eslint-disable-line no-unused-vars
import { Steps, Button, message } from "antd"; // eslint-disable-line no-unused-vars

// eslint-disable-next-line no-unused-vars
const Step = Steps.Step;


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
		this.handleSubmit = this.handleSubmit.bind(this);
		this.nextStep = this.nextStep.bind(this);
		this.prevStep = this.prevStep.bind(this);
		this.saveInput = this.saveInput.bind(this);
	}
	// TODO: figure out why = is unexpected token and rewrite it to anonymous functions
	// Save input value to state key declared on lower component
	saveInput(e, key){
		this.setState({[key]:e.target.value});
	}

	// Progress into registration
	nextStep(e){
		e.preventDefault();
		if(this.state.step<2){
			this.setState({step:this.state.step+1});
		}
	}
	prevStep(e){
		e.preventDefault();
		if(this.state.step>0){
			this.setState({step:this.state.step-1});
		}
	}

	handleSubmit(){

	}
	
	render(){
		const steps = [
			{
				title: "Email",
				content: <StepOne onChange={this.saveInput} value={this.state.email} nextStep={this.nextStep}></StepOne>,
			},
			{
				title: "Username and Password",
				content: <StepTwo onChange={this.saveInput} username={this.state.username} password={this.state.password} prevStep={this.prevStep} nextStep={this.nextStep}></StepTwo>,
			},
			{
				title: "Description",
				content: <StepThree onChange={this.saveInput} prevStep={this.prevStep}></StepThree>,
			},
		];
		return(
			<div className="registration">
				<Steps current={this.state.step}>
					{steps.map(item => (
						<Step key={item.title} title={item.title} />
					))}
				</Steps>
				<div className="steps-content">{steps[this.state.step].content}</div>
			</div>
		);
	}
}

export default Registration;