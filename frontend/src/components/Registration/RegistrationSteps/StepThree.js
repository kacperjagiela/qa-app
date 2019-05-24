import * as React from "react";
import styled, {keyframes} from "styled-components";
import {fadeInRight} from "react-animations";

class StepThree extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			mounted:false
		};
		this.div = styled(this.props.div)`
			background-color:red;
			animation: 1.5s ${keyframes `${fadeInRight}`};
		`;
	}

	render(){
		const Div = this.div; // eslint-disable-line no-unused-vars
		return(
			<Div>
				<h1>Hello #</h1>
				{this.props.input}
				{this.props.button}
			</Div>
		);
	}
}

export default StepThree;