import * as React from "react";
import { Layout, Menu, Icon } from "antd"; // eslint-disable-line no-unused-vars
import { Link } from "react-router-dom"; // eslint-disable-line no-unused-vars

const {Sider} = Layout; // eslint-disable-line no-unused-vars

export default class NavigationSider extends React.Component{
	render(){
		return(
			<Sider 
				breakpoint="lg" 
				collapsedWidth="0" 
			>
				{/* Logo here */}
				<Menu theme="light" mode="inline" defaultSelectedKeys={this.props.selected.split("")} style={{height:"100%"}}>
					<Menu.Item key="1" onClick={e=>this.props.handleChange(e)}>
						<Link to="/home">
							<Icon type="home"/>
							<span className="nav-text">Home</span>
						</Link>
					</Menu.Item>
					<Menu.Item key="2" onClick={e=>this.props.handleChange(e)}>
						<Link to="/profile">
							<Icon type="profile"/>
							<span className="nav-text">Your profile</span>
						</Link>
					</Menu.Item>
					<Menu.Item key="3" onClick={e=>this.props.handleChange(e)}>
						<Link to="/settings">
							<Icon type="setting"/>
							<span className="nav-text">Settings</span>
						</Link>
					</Menu.Item>
					<Menu.Item key="4" onClick={e=>this.props.handleChange(e)}>
						<Link to="/logout">
							<Icon type="logout"/>
							<span className="nav-text">Log out</span>
						</Link>
					</Menu.Item>
				</Menu>
			</Sider>
		);
	}
}