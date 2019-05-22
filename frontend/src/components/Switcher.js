import * as React from 'react';
import {Switch, Route} from 'react-router-dom';
import App from './App';
import Registration from './Registration';

class Switcher extends React.Component{
    render(){
        return(
            <Switch>
                <Route exact path="/register" component={Registration}/>
                <Route path='/' component={App}/>
            </Switch>
        );
    }
}

export default Switcher;