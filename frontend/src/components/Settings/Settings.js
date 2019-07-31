import * as React from 'react';
import { withRouter } from 'react-router-dom';
import {
	Layout, Form, Input, Icon, Upload, Button, Typography, Alert,
} from 'antd';
import { getCookie } from '../Reusable/cookies';
import { sendFile, changeDetails, getUserData } from '../Reusable/services';

const { Content, Footer } = Layout;

class SettingsForm extends React.Component {
	state = {
		logged: getCookie('login'),
		fileList: [],
		uploading: false,
		previousDescription: '',
		visible: false,
	}

	componentDidMount() {
		const { logged } = this.state;
		getUserData(logged).then((res) => {
			if (res.data.description !== 'undefined') {
				this.setState({
					previousDescription: res.data.description,
				});
			}
		});
	}

	handleUpload = () => {
		const { fileList, logged } = this.state;
		const formData = new FormData();
		formData.append('username', logged);
		formData.append('file', fileList[fileList.length - 1]);
		this.setState({
			uploading: true,
		});
		sendFile(formData, logged)
			.then((result) => {
				if (result.data) {
					this.setState({
						fileList: [],
						uploading: false,
					});
				} else {
					this.setState({
						uploading: false,
					});
				}
			});
	}

	onClose = () => {
		const { history } = this.props;
		const { logged } = this.state;
		history.push(`/profile/${logged}`);
	}

	handleSubmit = (e) => {
		e.preventDefault();
		const { form } = this.props;
		const { logged } = this.state;
		form.validateFields((err, values) => {
			if (values) {
				changeDetails(values, logged)
					.then((result) => {
						this.setState({
							visible: result,
						});
					});
			}
		});
	}

	render() {
		const {
			logged, uploading, fileList, previousDescription, visible,
		} = this.state;
		const { form, history } = this.props;
		const props = {
			onRemove: (file) => {
				this.setState((state) => {
					const index = state.fileList.indexOf(file);
					const newFileList = state.fileList.slice();
					newFileList.splice(index, 1);
					return {
						fileList: newFileList,
					};
				});
			},
			beforeUpload: (file) => {
				this.setState(state => ({
					fileList: [...state.fileList, file],
				}));
				return false;
			},
			fileList,
		};
		if (logged) {
			return (
				<Layout style={{
					minHeight: '100vh', width: '100%', paddingLeft: '10%', paddingRight: '10%', overflow: 'auto',
				}}
				>
					<Content>
						<Typography.Title level={2} style={{ paddingTop: '5vh', textAlign: 'center', marginBottom: '12px' }}>
							Settings
							{' '}
							<Icon type="setting" />
						</Typography.Title>
						<Alert
							message="Description saved!"
							type="success"
							onClose={this.onClose}
							style={
								visible
									? {
										visibility: 'visible', position: 'relative', top: '20%', left: '20%', zIndex: 2, width: '60%',
									}
									: {
										visibility: 'hidden', position: 'relative', top: '20%', left: '20%', zIndex: 2, width: '60%',
									}}
							showIcon
							closable
						/>
						<Form onSubmit={this.handleSubmit}>
							<Typography.Paragraph>
								Change your description:
							</Typography.Paragraph>
							<Form.Item>
								{
									form.getFieldDecorator('description', { initialValue: previousDescription })(<Input.TextArea placeholder='Update description' />)
								}
							</Form.Item>
							<Typography.Paragraph>
								Change your profile picture:
							</Typography.Paragraph>
							<Form.Item>
								<Upload {...props}>
									<Button>
										<Icon type="upload" />
										Choose image
									</Button>
								</Upload>
								<Button
									type="primary"
									onClick={this.handleUpload}
									disabled={fileList.length === 0}
									loading={uploading}
									style={{ marginTop: 16 }}
								>
									{uploading ? 'Uploading' : 'Change profile picture'}
								</Button>
							</Form.Item>
							<Button style={{ width: '60%', marginLeft: '20%', marginTop: '5%' }} type='primary' htmlType='submit'>
								Save description
							</Button>
						</Form>
						<Footer style={{ width: '100%', textAlign: 'center' }}>
							Created by Kacper Jagieła
						</Footer>
					</Content>
				</Layout>
			);
		}
		history.push('/home');
		return null;
	}
}

const Settings = withRouter(Form.create({ name: 'settings' })(SettingsForm));

export default Settings;
