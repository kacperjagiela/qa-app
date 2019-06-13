import * as React from "react";
import {Cookies} from "react-cookie";
import Home from "./Home"; // eslint-disable-line no-unused-vars
import WelcomePage from "../WelcomePage/WelcomePage"; //eslint-disable-line no-unused-vars
import {withRouter} from "react-router-dom";

const cookies = new Cookies();

class HomeWrapper extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			login: cookies.get("login"),
		};
		console.log("a");
	}

	componentWillUnmount(){
		if(this.props.location.state){
			this.props.refresh();
		}
	}

	render(){
		if(this.state.login){
			return(
				<Home login={this.state.login} refresh={this.props.refresh}/>
			);
		}else{
			return(
				<WelcomePage refresh={this.props.refresh}/>
			);
		}
	}
}
export default withRouter(HomeWrapper);