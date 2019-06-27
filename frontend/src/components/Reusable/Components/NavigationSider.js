import * as React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

const NavigationSider = ({ selected, handleChange, login }) => (
	<Layout.Sider
		breakpoint='lg'
		collapsedWidth='0'
		style={{ zIndex: '1' }}
	>
		<Menu theme='light' mode='inline' defaultSelectedKeys={selected.split('')} style={{ height: '100%' }}>
			<Menu.Item key='1' onClick={e => handleChange(e)}>
				<Link to='/home'>
					<Icon type='home' />
					<span className='nav-text'>Home</span>
				</Link>
			</Menu.Item>
			<Menu.Item key='2' onClick={e => handleChange(e)}>
				<Link to={`/profile/${login}`}>
					<Icon type='profile' />
					<span className='nav-text'>Your profile</span>
				</Link>
			</Menu.Item>
			<Menu.Item key='3' onClick={e => handleChange(e)}>
				<Link to='/settings'>
					<Icon type='setting' />
					<span className='nav-text'>Settings</span>
				</Link>
			</Menu.Item>
			<Menu.Item key='4' onClick={e => handleChange(e)}>
				<Link to='/logout'>
					<Icon type='logout' />
					<span className='nav-text'>Log out</span>
				</Link>
			</Menu.Item>
		</Menu>
	</Layout.Sider>
);

export default NavigationSider;
