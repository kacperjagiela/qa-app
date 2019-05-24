import * as React from "react";
import { Step, InputText, Button, ButtonInnactive } from "../../Styles"; // eslint-disable-line no-unused-vars

class StepOne extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			buttonReady: false
		};
	}

	render(){
		let NextStep = ""; // eslint-disable-line no-unused-vars
		if(this.props.value!==""){
			NextStep = Button;
		}else{
			NextStep = ButtonInnactive;
		}
		return(
			<Step>
				<h1>Sweet! You decided to join!</h1>
				<h3>Please enter your email</h3>
				<form onSubmit={this.props.nextStep} method="post">
					<InputText type="email" onChange={this.props.onChange} value={this.props.value} name="email" required/><br></br>
					<NextStep type="submit" value="Next Step"/>
				</form>
			</Step>
		);
	}
}

export default StepOne;