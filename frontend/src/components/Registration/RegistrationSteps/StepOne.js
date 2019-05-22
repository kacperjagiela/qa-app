import * as React from 'react';

class StepOne extends React.Component{
    render(){
        return(
            <div className='StepOne'>
                <h1>One</h1>
                {this.props.button}
            </div>
        );
    }
}

export default StepOne;