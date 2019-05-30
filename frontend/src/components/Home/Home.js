import * as React from "react";
import { Layout, Menu, Icon } from "antd"; // eslint-disable-line no-unused-vars
import NavigationSider from "../Reusable/NavigationSider"; // eslint-disable-line no-unused-vars

const { Content, Footer } = Layout; // eslint-disable-line no-unused-vars

export default class Home extends React.Component{
	render(){
		return(
			<Layout style={{minHeight:"100vh"}}>
				<NavigationSider selected="1"/>
				<Layout>
					<Content>
						<h1>Basic content</h1>
					</Content>
					<Footer>Created by Kacper Jagieła</Footer>
				</Layout>
			</Layout>
		);
	}
}