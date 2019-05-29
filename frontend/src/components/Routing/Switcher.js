import * as React from "react";
import {Switch, Route} from "react-router-dom"; // eslint-disable-line no-unused-vars
import {withRouter} from "react-router-dom";
import WelcomePage from "../WelcomePage/WelcomePage";
import Registration from "../Registration/Registration";
import Login from "../Login/Login";
import Home from "../Home/Home";

class Switcher extends React.Component{
	render(){
		return(
			<Switch>
				<Route exact path="/home" component={Home}/>
				<Route exact path="/register" component={Registration}/>
				<Route exact path="/login" component={withRouter(Login)}/>
				<Route path="/" component={WelcomePage}/>
			</Switch>
		);
	}
}

export default Switcher;