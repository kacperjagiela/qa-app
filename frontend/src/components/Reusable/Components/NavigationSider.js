import * as React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

class NavigationSider extends React.Component {
	state = {
		collapsed: false,
		width: 0,
	};

	componentDidMount() {
		this.updateWindowDimensions();
		window.addEventListener('resize', this.updateWindowDimensions);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateWindowDimensions);
	}

	updateWindowDimensions = () => {
		this.setState({
			width: window.innerWidth,
		});
	}

	onCollapse = (collapsed) => {
		this.setState({ collapsed });
	};

	render() {
		const { collapsed, width } = this.state;
		const { selected, login } = this.props;
		return (
			<Layout.Sider
				collapsed={collapsed}
				onCollapse={this.onCollapse}
				breakpoint='md'
				collapsedWidth='0'
				style={{ heigth: '100vh', zIndex: 2 }}
				width={width <= 768 ? 130 : 200}
			>
				<Menu theme='light' mode='inline' defaultSelectedKeys={selected.split(' ')} style={{ height: '100%' }}>
					<Menu.Item key='home'>
						<Link to='/home'>
							<Icon type='home' />
							<span className='nav-text'>Home</span>
						</Link>
					</Menu.Item>
					<Menu.Item key='profile'>
						<Link to={`/profile/${login}`}>
							<Icon type='profile' />
							<span className='nav-text'>Your profile</span>
						</Link>
					</Menu.Item>
					<Menu.Item key='settings'>
						<Link to='/settings'>
							<Icon type='setting' />
							<span className='nav-text'>Settings</span>
						</Link>
					</Menu.Item>
					<Menu.Item key='logout'>
						<Link to='/logout'>
							<Icon type='logout' />
							<span className='nav-text'>Log out</span>
						</Link>
					</Menu.Item>
				</Menu>
			</Layout.Sider>
		);
	}
}

export default NavigationSider;
