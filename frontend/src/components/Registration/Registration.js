import * as React from 'react';
import './Registration.css';
import { Steps, Alert } from 'antd';
import { Cookies } from 'react-cookie';
import axios from 'axios';
import StepOne from './RegistrationSteps/StepOne';
import StepTwo from './RegistrationSteps/StepTwo';
import StepThree from './RegistrationSteps/StepThree';

const { Step } = Steps;
const cookie = new Cookies();

class Registration extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			step: 0,
			email: '',
			username: '',
			password: '',
			// profilepicture: '',
			// description: '',
			visible: false,
			valid: true,
		};
	}

	// Save input value to state key declared on lower component
	saveInput = (e, key) => {
		this.setState({ [key]: e.target.value });
	}

	// Progress into registration
	nextStep = (e) => {
		e.preventDefault();
		const { step } = this.state;
		if (step < 2) {
			this.setState({ step: step + 1 });
		}
	}

	prevStep = (e) => {
		e.preventDefault();
		const { step } = this.state;
		if (step > 0) {
			this.setState({ step: step - 1 });
		}
	}

	handleSubmit = (e) => {
		e.preventDefault();
		axios.post('http://192.168.8.192:8080/register', { data: this.state })
			.then((res) => {
				if (res.data === 'Created user') {
					this.setState({ visible: true });
				}
				this.setState({ valid: false });
			});
	}

	handleClose = () => {
		const { history } = this.props;
		history.push('/login');
	}

	render() {
		const {
			username, password, email, visible, valid, step,
		} = this.state;
		const { history } = this.props;
		const steps = [
			{
				title: 'Email',
				content: <StepOne
					onChange={this.saveInput}
					value={email}
					nextStep={this.nextStep}
				/>,
			},
			{
				title: 'Username and Password',
				content: <StepTwo
					onChange={this.saveInput}
					username={username}
					password={password}
					prevStep={this.prevStep}
					nextStep={this.nextStep}
				/>,
			},
			{
				title: 'Description',
				content: <StepThree
					onChange={this.saveInput}
					prevStep={this.prevStep}
					onSubmit={e => this.handleSubmit(e)}
				/>,
			},
		];
		if (cookie.get('login')) {
			history.push('home');
			return null;
		}
		return (
			<div className='registration'>
				{visible ? (
					<Alert
						message='User created succesfully!'
						type='success'
						closable
						afterClose={this.handleClose}
						style={{
							zIndex: 3000, position: 'absolute', top: '40vh', width: '100%', textAlign: 'center',
						}}
					/>
				) : null}
				{valid ? null : (
					<Alert
						message='User already exists!'
						type='error'
						closable
						afterClose={history.push('/register')}
						style={{
							zIndex: 3000, position: 'absolute', top: '40vh', width: '100%', textAlign: 'center',
						}}
					/>
				)}
				<Steps current={step}>
					{steps.map(item => (
						<Step key={item.title} title={item.title} />
					))}
				</Steps>
				<div className='steps-content'>{steps[step].content}</div>
			</div>
		);
	}
}

export default Registration;
