import * as React from "react";
import { Step } from "../../Styles"; // eslint-disable-line no-unused-vars

class StepOne extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			mounted:false
		};
	}

	render(){
		return(
			<Step>
				<h1>Hello 1</h1>
				<form onSubmit={this.props.nextStep}>
					<input type="email" onChange={this.props.onChange} value={this.props.value} name="email" required/><br></br>
					<input type="submit" value="Next Step" className="next-step"/>
				</form>
			</Step>
		);
	}
}

export default StepOne;