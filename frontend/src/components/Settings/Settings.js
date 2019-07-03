import * as React from 'react';
import { withRouter } from 'react-router-dom';
import {
	Layout, Form, Input, Icon, Upload, Button,
} from 'antd';
import { getCookie } from '../Reusable/cookies';
import { sendFile } from '../Reusable/services';

const { Content, Footer } = Layout;

class SettingsForm extends React.Component {
	state = {
		logged: getCookie('login'),
		fileList: [],
		uploading: false,
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

	render() {
		const { logged, uploading, fileList } = this.state;
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
						<Form onSubmit={this.handleSubmit}>
							<Form.Item>
								{form.getFieldDecorator('username')(<Input prefix={<Icon type='user' />} allowClear />)}
							</Form.Item>
							<Form.Item>
								{form.getFieldDecorator('description')(<Input.TextArea placeholder='Update description' />)}
							</Form.Item>
							<Form.Item>
								<Upload {...props}>
									<Button>
										<Icon type="upload" />
										Select File
									</Button>
								</Upload>
								<Button
									type="primary"
									onClick={this.handleUpload}
									disabled={fileList.length === 0}
									loading={uploading}
									style={{ marginTop: 16 }}
								>
									{uploading ? 'Uploading' : 'Start Upload'}
								</Button>
							</Form.Item>
						</Form>
					</Content>
					<Footer style={{ width: '100%', textAlign: 'center' }}>
						Created by Kacper Jagieła
					</Footer>
				</Layout>
			);
		}
		history.push('/home');
		return null;
	}
}

const Settings = withRouter(Form.create({ name: 'settings' })(SettingsForm));

export default Settings;
