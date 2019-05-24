import * as React from "react";
import styled, {keyframes} from "styled-components";
import {fadeIn} from "react-animations";

class StepOne extends React.Component{
	render(){
		// eslint-disable-next-line no-unused-vars
		const Div = styled(this.props.div)` 
			background-color:red;
			animation: 1.5s ${keyframes `${fadeIn}`} 
		`;
		return(
			<Div>
				<h1>One</h1>
				{this.props.button}
			</Div>
		);
	}
}

export default StepOne;