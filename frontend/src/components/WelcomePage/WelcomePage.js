import * as React from "react";
import "./WelcomePage.css";
import {Link} from "react-router-dom"; // eslint-disable-line no-unused-vars

class WelcomePage extends React.Component {
	render() {
		return (
			<div className="WelcomePage">
				<h1><img src="https://via.placeholder.com/60x60.png" alt="okay"/> Let's know each other! </h1>
				<h2>Enter the best Question and Answers site</h2>
				<Link to="/register"><button>Join now</button></Link>
				<h4>or <Link to="/login">log in</Link></h4>
			</div>
		);
	}
}

export default WelcomePage;
