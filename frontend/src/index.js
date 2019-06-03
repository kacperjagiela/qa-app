import React from "react"; // eslint-disable-line no-unused-vars
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom"; // eslint-disable-line no-unused-vars
import AppWrapper from "./components/AppWrapper/AppWrapper"; // eslint-disable-line no-unused-vars
import { CookiesProvider } from "react-cookie"; //eslint-disable-line no-unused-vars
import "./index.css";
import "antd/dist/antd.css";

ReactDOM.render(
	<CookiesProvider>
		<BrowserRouter>
			<AppWrapper/>
		</BrowserRouter>
	</CookiesProvider>,
	document.getElementById("root")
);
