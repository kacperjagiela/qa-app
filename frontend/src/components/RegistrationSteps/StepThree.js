import * as React from 'react';

class StepThree extends React.Component{
    render(){
        return(
            <div className='StepOne'>
                <h1>Three</h1>
                {this.props.button}
            </div>
        );
    }
}

export default StepThree;