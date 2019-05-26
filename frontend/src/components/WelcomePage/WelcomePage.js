import * as React from "react";
import "./WelcomePage.css";
import {Link} from "react-router-dom"; // eslint-disable-line no-unused-vars
import {Button} from "antd"; // eslint-disable-line no-unused-vars

class WelcomePage extends React.Component {
	render() {
		return (
			<div className="welcome-page">
				<h1>Let's know each other! </h1>
				<h2>Enter the best Question and Answers site</h2>
				<Link to="/register"><Button type="primary" size="large" shape="round">Join now</Button></Link>
				<h4>or <Link to="/login">log in</Link></h4>
			</div>
		);
	}
}

export default WelcomePage;
