import * as React from "react";
import { Layout, Menu, Icon } from "antd"; // eslint-disable-line no-unused-vars

const { Content, Footer } = Layout; // eslint-disable-line no-unused-vars

export default class Home extends React.Component{
	constructor(props){
		super(props);
		this.props.refresh();
	}

	render(){
		return(
			<Layout style={{minHeight:"100vh"}}>
				<Content>
					<h1>Basic content</h1>
					<h2>{this.props.login}</h2>
				</Content>
				<Footer>Created by Kacper Jagieła</Footer>
			</Layout>
		);
	}
}