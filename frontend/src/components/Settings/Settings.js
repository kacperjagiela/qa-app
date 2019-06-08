import * as React from "react";
import { Layout, Menu, Icon } from "antd"; // eslint-disable-line no-unused-vars
import NavigationSider from "../Reusable/NavigationSider"; // eslint-disable-line no-unused-vars
import { Cookies } from "react-cookie";

const { Content, Footer } = Layout; // eslint-disable-line no-unused-vars

const cookies = new Cookies();

export default class Home extends React.Component{
	render(){
		if(cookies.get("login")){
			return(
				<Layout style={{minHeight:"100vh"}}>
					<Content>
						<h1>Settings content</h1>
					</Content>
				</Layout>
			);
		}else{
			this.props.history.push("/home");
			return null;
		}
		
	}
}