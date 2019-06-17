import * as React from 'react';
import './WelcomePage.css';
import { Link } from 'react-router-dom';
import { Button, Typography } from 'antd';

const WelcomePage = () => (
	<div className='welcome-page'>
		<Typography.Title type={1}>Let&aposs know each other! </Typography.Title>
		<Typography.Paragraph style={{ fontFamily: 'Roboto', fontWeight: 'bold' }}>Enter the best Question and Answers site</Typography.Paragraph>
		<Link to='/register'><Button type='primary' size='large' shape='round'>Join now</Button></Link>
		<h4>
			or
			<Link to='/login'> log in</Link>
		</h4>
	</div>
);


export default WelcomePage;
