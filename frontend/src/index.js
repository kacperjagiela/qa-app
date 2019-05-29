import React from "react"; // eslint-disable-line no-unused-vars
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom"; // eslint-disable-line no-unused-vars
import Switcher from "./components/Routing/Switcher"; // eslint-disable-line no-unused-vars
import { CookiesProvider } from "react-cookie"; //eslint-disable-line no-unused-vars
import "./index.css";
import "antd/dist/antd.css";

ReactDOM.render(
	<CookiesProvider>
		<BrowserRouter>
			<Switcher/>
		</BrowserRouter>
	</CookiesProvider>,
	document.getElementById("root")
);
