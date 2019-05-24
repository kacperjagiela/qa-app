import * as React from "react";
import { Step } from "../../Styles"; // eslint-disable-line no-unused-vars

class StepThree extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			mounted:false
		};
	}

	render(){
		return(
			<Step>
				<h1>Hello 3</h1>
			</Step>
		);
	}
}

export default StepThree;