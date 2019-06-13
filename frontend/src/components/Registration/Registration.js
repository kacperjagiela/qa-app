import * as React from "react";
import "./Registration.css";
import StepOne from "./RegistrationSteps/StepOne"; // eslint-disable-line no-unused-vars
import StepTwo from "./RegistrationSteps/StepTwo"; // eslint-disable-line no-unused-vars
import StepThree from "./RegistrationSteps/StepThree"; // eslint-disable-line no-unused-vars
import { Steps, Alert } from "antd"; // eslint-disable-line no-unused-vars
import { Cookies } from "react-cookie";
import axios from "axios";

// eslint-disable-next-line no-unused-vars
const Step = Steps.Step;
const cookie = new Cookies();

class Registration extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			step: 0,
			email: "",
			username: "",
			password: "",
			profilepicture: "",
			description: "",
			visible:false,
			valid:true
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.nextStep = this.nextStep.bind(this);
		this.prevStep = this.prevStep.bind(this);
		this.saveInput = this.saveInput.bind(this);
	}
	// Save input value to state key declared on lower component
	saveInput(e, key){
		this.setState({[key]:e.target.value});
	}

	// Progress into registration
	nextStep(e){
		e.preventDefault();
		if(this.state.step<2){
			this.setState({step:this.state.step+1});
		}
	}
	prevStep(e){
		e.preventDefault();
		if(this.state.step>0){
			this.setState({step:this.state.step-1});
		}
	}

	handleSubmit(e){
		e.preventDefault();
		axios.post("http://192.168.8.192:8080/register", {data:this.state})
			.then(res=>{
				if(res.data==="Created user"){
					this.setState({visible:true});
				}else{
					this.setState({valid:false});
				}
			});
	}
	handleClose(){
		this.props.history.push("/login");
	}
	
	render(){
		const steps = [
			{
				title: "Email",
				content: <StepOne onChange={this.saveInput} value={this.state.email} nextStep={this.nextStep}></StepOne>,
			},
			{
				title: "Username and Password",
				content: <StepTwo onChange={this.saveInput} username={this.state.username} password={this.state.password} prevStep={this.prevStep} nextStep={this.nextStep}></StepTwo>,
			},
			{
				title: "Description",
				content: <StepThree onChange={this.saveInput} prevStep={this.prevStep} onSubmit={e=>this.handleSubmit(e)}></StepThree>,
			},
		];
		if(cookie.get("login")){
			this.props.history.push("home");
			return null;
		}else{
			return(
				<div className="registration">
					{this.state.visible ? (
						<Alert
							message="User created succesfully!"
							type="success"
							closable
							afterClose={this.handleClose.bind(this)}
							style={{zIndex:3000, position:"absolute", top:"40vh", width:"100%", textAlign:"center"}}
						/>): null }
					{this.state.valid ? 
						null : 
						(<Alert
							message="User already exists!"
							type="error"
							closable
							afterClose={this.props.history.push("/register")}
							style={{zIndex:3000, position:"absolute", top:"40vh", width:"100%", textAlign:"center"}}
						/>) }
					<Steps current={this.state.step}>
						{steps.map(item => (
							<Step key={item.title} title={item.title} />
						))}
					</Steps>
					<div className="steps-content">{steps[this.state.step].content}</div>
				</div>
			);
		}
	}
}

export default Registration;