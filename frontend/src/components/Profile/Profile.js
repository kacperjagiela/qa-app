import * as React from "react";
import { Layout, Typography} from "antd"; // eslint-disable-line no-unused-vars
import { Cookies } from "react-cookie";
import axios from "axios";
import {Profilepic} from "../Styles"; // eslint-disable-line no-unused-vars

const { Content, Footer } = Layout; // eslint-disable-line no-unused-vars
const {Title, Paragraph, Text} = Typography; // eslint-disable-line no-unused-vars
const cookie = new Cookies();

export default class Profile extends React.Component{
	constructor(props){
		super(props);
		this.state={id:0};
	}

	componentDidMount(){
		axios.get(`http://192.168.8.192:8080/profile/${this.props.match.params.username}`)
			.then(res=>{
				this.setState({
					id: res.data.id,
					username:res.data.username,
					email:res.data.email,
					description:res.data.description,
					profilepic: res.data.profilepic
				});
			});
	}

	render(){

		if(cookie.get("login")){
			return(
				<Layout style={{minHeight:"100vh"}}>
					<Content style={{width:"80vw", paddingLeft:"10vw", height:"95vh", paddingTop:"5vh"}}>
						<a href="https://placeholder.com" style={{float:"left", marginRight:"10px"}}><Profilepic src="https://via.placeholder.com/100x100" alt="100x100"/></a>
						<Title level={2}>{this.state.username}</Title>
						<Paragraph strong> {this.state.description}</Paragraph>
						<div>
							Get all user questions here
						</div>
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