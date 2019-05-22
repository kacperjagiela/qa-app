import * as React from 'react';

class StepTwo extends React.Component{
    render(){
        return(
            <div className='StepOne'>
                <h1>Two</h1>
                {this.props.button}
            </div>
        );
    }
}

export default StepTwo;