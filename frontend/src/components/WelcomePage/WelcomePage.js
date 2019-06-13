import * as React from "react";
import "./WelcomePage.css";
import {Link} from "react-router-dom"; // eslint-disable-line no-unused-vars
import {Button, Typography} from "antd"; // eslint-disable-line no-unused-vars

class WelcomePage extends React.Component {
	constructor(props){
		super(props);
		if(this.props.refresh){
			this.props.refresh();
		}
	}

	render() {
		return (
			<div className="welcome-page">
				<Typography.Title type={1}>Let's know each other! </Typography.Title>
				<Typography.Paragraph style={{fontFamily: "Roboto", fontWeight: "bold"}}>Enter the best Question and Answers site</Typography.Paragraph>
				<Link to="/register"><Button type="primary" size="large" shape="round">Join now</Button></Link>
				<h4>or <Link to="/login">log in</Link></h4>
			</div>
		);
	}
}

export default WelcomePage;
