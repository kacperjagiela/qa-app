import * as React from "react";
import { Step } from "../../Styles"; // eslint-disable-line no-unused-vars

class StepTwo extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			mounted:false
		};
	}

	render(){
		return(
			<Step>
				<h1>Hello 2</h1>
			</Step>
		);
	}
}

export default StepTwo;