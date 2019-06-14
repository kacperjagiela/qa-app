import * as React from "react";
import { Layout, Menu, Icon } from "antd"; // eslint-disable-line no-unused-vars
import { Cookies } from "react-cookie";
import axios from "axios";

const { Content, Footer } = Layout; // eslint-disable-line no-unused-vars
const cookie = new Cookies();

export default class Profile extends React.Component{
	constructor(props){
		super(props);
		this.state={data:{}};
	}

	componentDidMount(){
		axios.get(`http://192.168.8.192:8080/profile/${this.props.match.params.username}`)
			.then(res=>{
				console.log(res);
				this.setState(res.data);
			});
		console.log(this.state);
	}

	render(){
		if(cookie.get("login")){
			return(
				<Layout style={{minHeight:"100vh"}}>
					<Content>
						<h1>Profile {this.props.match.params.username}</h1>
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