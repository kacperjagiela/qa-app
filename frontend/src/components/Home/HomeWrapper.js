import * as React from "react";
import {Cookies} from "react-cookie";
import Home from "./Home"; // eslint-disable-line no-unused-vars
import WelcomePage from "../WelcomePage/WelcomePage"; //eslint-disable-line no-unused-vars

export default class HomeWrapper extends React.Component{

	constructor(props){
		super(props);
		const cookies = new Cookies();
		this.state = {
			login: cookies.get("login")
		};
	}
	render(){
		if(this.state.login){
			return(
				<Home login="123"/>
			);
		}else{
			return(
				<WelcomePage/>
			);
		}
	}
}