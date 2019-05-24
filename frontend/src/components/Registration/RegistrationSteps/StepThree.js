import * as React from "react";
import styled, {keyframes} from "styled-components";
import {fadeInRight} from "react-animations";

class StepThree extends React.Component{
	render(){
		// eslint-disable-next-line no-unused-vars
		const Div = styled(this.props.div)` 
			background-color:blue;
			animation: 1.5s ${keyframes `${fadeInRight}`} 
		`;
		return(
			<Div>
				<h1>Three</h1>
				{this.props.button}
			</Div>
		);
	}
}

export default StepThree;