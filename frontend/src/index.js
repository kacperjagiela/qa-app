import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import AppWrapper from './components/AppWrapper/AppWrapper';
import './index.css';
import 'antd/dist/antd.css';

ReactDOM.render(
	<CookiesProvider>
		<BrowserRouter>
			<AppWrapper />
		</BrowserRouter>
	</CookiesProvider>,
	document.getElementById('root'),
);
