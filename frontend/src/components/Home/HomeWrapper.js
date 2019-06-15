import * as React from "react";
import { Cookies } from "react-cookie";
import Home from "./Home"; // eslint-disable-line no-unused-vars
import WelcomePage from "../WelcomePage/WelcomePage"; //eslint-disable-line no-unused-vars
import { withRouter } from "react-router-dom";

const cookies = new Cookies();

class HomeWrapper extends React.Component {
  // this way you can skip the constructor logic
  // state = {
  // 	login: cookies.get("login")
  // }
  constructor(props) {
    super(props);
    this.state = {
      login: cookies.get("login")
    };
  }

  componentDidMount() {
    if (this.props.location.state) {
      this.props.refresh();
    }
  }

  render() {
    // same story with that way of handling conditional rendering as in AppWrapper.js
    if (this.state.login) {
      return <Home login={this.state.login} refresh={this.props.refresh} />;
    } else {
      return <WelcomePage refresh={this.props.refresh} />;
    }
  }
}
export default withRouter(HomeWrapper);
