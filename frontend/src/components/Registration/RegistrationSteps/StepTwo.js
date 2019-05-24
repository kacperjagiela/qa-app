import * as React from "react";
import { Step, InputText, Button, ButtonInnactive } from "../../Styles"; // eslint-disable-line no-unused-vars

class StepTwo extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			buttonReady: false
		};
	}

	render(){
		let NextStep = ""; // eslint-disable-line no-unused-vars
		if(this.props.username!=="" && this.props.password!==""){
			NextStep = Button;
		}else{
			NextStep = ButtonInnactive;
		}
		return(
			<Step>
				<h1>Just a little bit more!</h1>
				<h3>Please enter your username and password</h3>
				<form onSubmit={this.props.nextStep} method="post">
					<InputText type="text" onChange={this.props.onChange} value={this.props.username} name="username" required/><br></br>
					<InputText type="password" onChange={this.props.onChange} value={this.props.password} name="password" required/><br></br>
					<NextStep type="submit" value="Next Step"/>
				</form>
			</Step>
		);
	}
}

export default StepTwo;