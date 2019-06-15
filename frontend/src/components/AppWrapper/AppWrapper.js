import * as React from "react";
// it is better to don't disable eslint like that, because you will forget about it and code will stay dirty
// you bring eslint into your project to always have stuff clean otherwise it doesn't make any sense to have it
import { Layout, Menu, Icon } from "antd"; // eslint-disable-line no-unused-vars
import NavigationSider from "../Reusable/NavigationSider"; // eslint-disable-line no-unused-vars
import Switcher from "../Routing/Switcher"; // eslint-disable-line no-unused-vars
import { Cookies } from "react-cookie";

// just create it in constructor if it's just a handle to browser's cookies
// ot move it to some functionality that would be called like someFunctionality.getLoginFromCookie
// much cleaner imo and you can reuse it easily
const cookies = new Cookies();

export default class AppWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: cookies.get("login"),
      current: 1
    };
    this.refresh = this.refresh.bind(this);
  }

  refresh() {
    this.setState({ login: cookies.get("login"), current: 1 });
  }

  // use functions defined like that to be just handlers to anonymous functions and you won't have to write
  // .bind(this) everywhere
  // this is a big simplification of life

  handleChange = e => {
    this.setState({ current: e.key });
  };

  render() {
    // I would recommend this as it is much more readable and easier to maintain
    //   const LoggedIn = () => (
    // 	  <Layout style={{ minHeight: "100vh", maxHeight: "100vh" }}>
    // 		  <NavigationSider
    // 			  handleChange={this.handleChange.bind(this)}
    // 			  selected={this.state.current.toString()}
    // 			  login={this.state.login}
    // 		  />
    // 		  <Switcher refresh={this.refresh} />
    // 	  </Layout>
    //   )

    //   const NotLoggedIn = () => (
    // 	  <Layout style={{ minHeight: "100vh", maxHeight: "100vh" }}>
    // 		  <Switcher refresh={this.refresh} />
    // 	  </Layout>
    //   )

    //   return (
    // 	  this.state.login? <LoggedIn /> : <NotLoggedIn />
    //   )

    if (this.state.login) {
      return (
        // move this configuration to some file where it is easily managable
        // e.g name it as fullScreenHeight and use it in many places
        <Layout style={{ minHeight: "100vh", maxHeight: "100vh" }}>
          <NavigationSider
            handleChange={this.handleChange.bind(this)}
            selected={this.state.current.toString()}
            login={this.state.login}
          />
          <Switcher refresh={this.refresh} />
        </Layout>
      );
    } else {
      return (
        <Layout style={{ minHeight: "100vh", maxHeight: "100vh" }}>
          <Switcher refresh={this.refresh} />
        </Layout>
      );
    }
  }
}
