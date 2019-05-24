import * as React from "react";
import {Switch, Route} from "react-router-dom"; // eslint-disable-line no-unused-vars
import WelcomePage from "./WelcomePage/WelcomePage"; // eslint-disable-line no-unused-vars
import Registration from "./Registration/Registration"; // eslint-disable-line no-unused-vars

class Switcher extends React.Component{
	render(){
		return(
			<Switch>
				<Route exact path="/register" render={()=><Registration/>}/>
				<Route path="/" render={()=><WelcomePage/>}/>
			</Switch>
		);
	}
}

export default Switcher;