import * as React from "react";
import { Redirect } from "react-router-dom"; // eslint-disable-line no-unused-vars
import { Cookies } from "react-cookie";

const cookies = new Cookies();

export default class Logout extends React.Component {
  render() {
    // same story as in AppWrapper.js
    if (cookies.get("login") && cookies.remove("login")) {
      this.props.history.push("/", { a: "b" });
      return null;
    } else {
      return <Redirect to="/" />;
    }
  }
}
