import * as React from "react";
import { Layout, Menu, Icon } from "antd"; // eslint-disable-line no-unused-vars
import { Cookies } from "react-cookie";

const { Content, Footer } = Layout; // eslint-disable-line no-unused-vars
const cookie = new Cookies();

export default class Home extends React.Component{
	render(){
		if(cookie.get("login")){
			return(
				<Layout style={{minHeight:"100vh"}}>
					<Content>
						<h1>Profile content</h1>
					</Content>
					<Footer>Created by Kacper Jagieła</Footer>
				</Layout>
			);
		}else{
			this.props.history.push("/home");
			return null;
		}
	}
}