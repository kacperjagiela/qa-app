import * as React from "react";
import { Switch, Route, Redirect } from "react-router-dom"; // eslint-disable-line no-unused-vars
import { withRouter } from "react-router-dom";
import Registration from "../Registration/Registration";
import Login from "../Login/Login";
import HomeWrapper from "../Home/HomeWrapper"; // eslint-disable-line no-unused-vars
import Profile from "../Profile/Profile";
import Settings from "../Settings/Settings"; // eslint-disable-line no-unused-vars
import Logout from "./Logout";

class Switcher extends React.Component {
  // is withRouter really needed ?
  // react-router will pass its props to component by default
  // just do component={<Component />}
  render() {
    return (
      <Switch>
        <Route exact path="/settings" component={withRouter(Settings)} />
        <Route
          exact
          path="/profile/:username"
          component={withRouter(Profile)}
        />
        <Route exact path="/register" component={withRouter(Registration)} />
        <Route exact path="/login" component={withRouter(Login)} />
        <Route exact path="/logout" component={withRouter(Logout)} />
        <Route
          path="/"
          render={() => <HomeWrapper refresh={this.props.refresh} />}
        />
      </Switch>
    );
  }
}

export default Switcher;
