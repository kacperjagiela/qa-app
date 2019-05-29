import * as React from "react";
import {Cookies} from "react-cookie";

export default class Home extends React.Component{

	constructor(props){
		super(props);
		const cookies = new Cookies();
		this.state = {
			login: cookies.get("login")
		};
		console.log(this.state);
	}
	render(){
		if(this.state.login){
			return(
				<div className="home">
					<h1>Welcome {this.state.login}</h1>
				</div>
			);
		}else{
			this.props.history.push("/");
			return(
				<h1></h1>
			);
		}
	}
}