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
		this.state={questions:[]};
	}

	componentDidMount(){
		//Get profile information from backend
		axios.get(`http://192.168.8.192:8080/profile/${this.props.match.params.username}`)
			.then(res=>{
				this.setState({
					id: res.data.id,
					username:res.data.username,
					email:res.data.email,
					description:res.data.description,
					profilepic: res.data.profilepic
				});
				//Get questions from backend
				axios.get(`http://192.168.8.192:8080/questions/${this.state.id}`)
					.then(res=>{
						this.setState({questions:res.data});
						console.log(this.state.questions);
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
							{this.state.questions.map((question, i)=>{
								return (<p key={i}>{question.content}</p>);
							})}
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