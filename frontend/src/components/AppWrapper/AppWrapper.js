import * as React from "react";
import { Layout, Menu, Icon } from "antd"; // eslint-disable-line no-unused-vars
import NavigationSider from "../Reusable/NavigationSider"; // eslint-disable-line no-unused-vars
import Switcher from "../Routing/Switcher"; // eslint-disable-line no-unused-vars
import {Cookies} from "react-cookie";

const cookies = new Cookies();

export default class AppWrapper extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			login: cookies.get("login"),
			current:1
		};
		this.refresh = this.refresh.bind(this);
	}
	
	refresh(){
		this.setState({login:cookies.get("login")});
	}

	handleChange(e){
		this.setState({current:e.key});
	}

	render(){
		if(this.state.login){
			return(
				<Layout style={{minHeight:"100vh"}}>
					<NavigationSider handleChange={this.handleChange.bind(this)} selected={this.state.current.toString()}/>
					<Switcher refresh={this.refresh}/>
				</Layout>
			);
		}else{
			return(
				<Layout style={{minHeight:"100vh"}}>
					<Switcher refresh={this.refresh}/>
				</Layout>
			);
		}
	}
}