import * as React from "react";
import styled, {keyframes} from "styled-components";
import {fadeInRight} from "react-animations";

class StepTwo extends React.Component{
	render(){
		// eslint-disable-next-line no-unused-vars
		const Div = styled(this.props.div)` 
			background-color:yellow;
			animation: 1.5s ${keyframes `${fadeInRight}`} 
		`;
		return(
			<Div>
				<h1>Two</h1>
				{this.props.button}
			</Div>
		);
	}
}

export default StepTwo;