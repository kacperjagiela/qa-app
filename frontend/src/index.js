import React from "react"; // eslint-disable-line no-unused-vars
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom"; // eslint-disable-line no-unused-vars
import Switcher from "./components/Switcher"; // eslint-disable-line no-unused-vars
import "./index.css";

ReactDOM.render(
	<BrowserRouter><Switcher/></BrowserRouter>,
	document.getElementById("root")
);
