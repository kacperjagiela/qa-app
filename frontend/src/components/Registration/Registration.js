import * as React from 'react';
import { Steps, Alert } from 'antd';
import { getCookie } from '../Reusable/cookies';
import { register } from '../Reusable/services';
import { Register } from '../Styles';
import StepOne from './RegistrationSteps/StepOne';
import StepTwo from './RegistrationSteps/StepTwo';
import StepThree from './RegistrationSteps/StepThree';

const { Step } = Steps;

class Registration extends React.Component {
	state = {
		step: 0,
		username: '',
		visible: false,
		valid: true,
	};

	// Save input value to state key declared on lower component
	saveInput = (state) => {
		this.setState(state);
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
		const { state } = this;
		register(state)
			.then((res) => {
				if (res.data) {
					this.setState({ visible: true });
				} else {
					this.setState({ valid: false });
				}
			})
			.catch(err => err);
	}

	handleClose = () => {
		const { history } = this.props;
		history.push('/login');
	}

	render() {
		const {
			visible, valid, step, username,
		} = this.state;
		const { history } = this.props;
		const steps = [
			{
				title: 'Email',
				content: <StepOne
					saveInput={this.saveInput}
					nextStep={this.nextStep}
				/>,
			},
			{
				title: 'Username and Password',
				content: <StepTwo
					saveInput={this.saveInput}
					prevStep={this.prevStep}
					nextStep={this.nextStep}
				/>,
			},
			{
				title: 'Description',
				content: <StepThree
					saveInput={this.saveInput}
					prevStep={this.prevStep}
					username={username}
					onSubmit={e => this.handleSubmit(e)}
				/>,
			},
		];
		const LoggedIn = () => {
			history.push('home', { refresh: true });
			return null;
		};
		const NotLoggedIn = () => (
			<Register>
				{visible ? (
					<Alert
						message='User created succesfully!'
						type='success'
						closable
						afterClose={this.handleClose}
						style={{
							zIndex: 3000, position: 'absolute', top: '40vh', width: '40%', textAlign: 'center', left: '30vw',
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
							zIndex: 3000, position: 'absolute', top: '40vh', width: '40%', textAlign: 'center', left: '30vw',
						}}
					/>
				)}
				<Steps current={step}>
					{steps.map(item => (
						<Step key={item.title} title={item.title} />
					))}
				</Steps>
				<div className='steps-content'>{steps[step].content}</div>
			</Register>
		);
		return (
			getCookie('login') ? <LoggedIn /> : <NotLoggedIn />
		);
	}
}

export default Registration;
