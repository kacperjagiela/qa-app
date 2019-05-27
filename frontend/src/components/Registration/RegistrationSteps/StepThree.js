import * as React from "react";
import { Typography } from "antd";
const { Title } = Typography; // eslint-disable-line no-unused-vars
import {FadeInRight} from "../../Styles"; // eslint-disable-line no-unused-vars

export default class StepThree extends React.Component{
	render(){
		return(
			<FadeInRight>
				<form className="step-three">
					<Title>Sweet! You decided to join!</Title>
					<Title level={3}>Please enter your email.</Title>
				</form>
			</FadeInRight>
		);
	}
}