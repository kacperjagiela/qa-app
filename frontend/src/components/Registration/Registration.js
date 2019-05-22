import * as React from "react";
import ".//Registration.css";
import StepOne from "./RegistrationSteps/StepOne"; // eslint-disable-line no-unused-vars
import StepTwo from "./RegistrationSteps/StepTwo"; // eslint-disable-line no-unused-vars
import StepThree from "./RegistrationSteps/StepThree"; // eslint-disable-line no-unused-vars


class Registration extends React.Component{
	constructor(){
		super();
		this.state = {
			step: 1,
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
		const steps = [<StepOne button={button}></StepOne>,
			<StepTwo button={button}></StepTwo>,
			<StepThree button={button}></StepThree>
		];
		return(
			<div className="Registration">
				{steps[this.state.step-1]}
			</div>
		);
	}
}

export default Registration;