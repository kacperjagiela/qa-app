import * as React from 'react';
import "../styles/Registration.css";
import StepOne from './RegistrationSteps/StepOne';
import StepTwo from './RegistrationSteps/StepTwo';
import StepThree from './RegistrationSteps/StepThree';


class Registration extends React.Component{
    constructor(){
        super();
        this.state = {
            step: 1,
        }
        this.nextStep = this.nextStep.bind(this);
    }

    nextStep(){
        if(this.state.step>=3){
            this.setState({step:1});
        }else{
            this.setState({step:this.state.step+1});
        }
        console.log(this.state.step);
    }

    render(){
        const button = <button onClick={e=>this.nextStep()}>Next step</button>
        const steps = [<StepOne button={button}></StepOne>,
            <StepTwo button={button}></StepTwo>,
            <StepThree button={button}></StepThree>
        ];
        return(
            <div className='Registration'>
                {steps[this.state.step-1]}
            </div>
        );
    }
}

export default Registration;