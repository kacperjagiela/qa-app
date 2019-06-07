import * as React from "react";
import {Switch, Route, Redirect} from "react-router-dom"; // eslint-disable-line no-unused-vars
import {withRouter} from "react-router-dom";
import Registration from "../Registration/Registration";
import Login from "../Login/Login";
import HomeWrapper from "../Home/HomeWrapper";
import Profile from "../Profile/Profile";
import Settings from "../Settings/Settings";

class Switcher extends React.Component{
	constructor(props){
		super(props);
		this.props.refresh();
	}

	render(){
		return(
			<Switch>
				<Route exact path="/settings" component={Settings}/>
				<Route exact path="/profile" component={Profile}/>
				<Route exact path="/register" component={Registration}/>
				<Route exact path="/login" component={withRouter(Login)}/>
				<Redirect from="/loginOK" to="/home"/>
				<Route path="/" component={HomeWrapper}/>
			</Switch>
		);
	}
}

export default Switcher;