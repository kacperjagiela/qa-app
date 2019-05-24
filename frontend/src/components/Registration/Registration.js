import * as React from "react";
import ".//Registration.css";
import StepOne from "./RegistrationSteps/StepOne"; // eslint-disable-line no-unused-vars
import StepTwo from "./RegistrationSteps/StepTwo"; // eslint-disable-line no-unused-vars
import StepThree from "./RegistrationSteps/StepThree"; // eslint-disable-line no-unused-vars
import styled from "styled-components";

const Div = styled.div`
	float:left;
	width:60vw;
	height:100%;
	margin-right:20vw;
	border-radius:10px;
	text-align:center;
`;

class Registration extends React.Component{
	constructor(){
		super();
		this.state = {
			step: 0,
		};
		this.nextStep = this.nextStep.bind(this);
	}

	nextStep(){
		if(this.state.step>=3){
			this.setState({step:1});
		}else{
			this.setState({step:this.state.step+1});
		}
	}

	render(){

		const button = <button onClick={()=>this.nextStep()} className="nextStep">Next step</button>;
		const submitButton = <input type="submit" value="Submit"/>;
		const steps=[<StepOne button={button} div={Div}></StepOne>,
			<StepTwo button={button} div={Div}></StepTwo>,
			<StepThree button={submitButton} div={Div}></StepThree>
		];
		return(
			<div className="Registration">
				{steps[this.state.step]}
			</div>
		);
	}
}

export default Registration;