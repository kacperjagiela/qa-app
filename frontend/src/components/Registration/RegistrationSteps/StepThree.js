import * as React from 'react';
import {
	Typography, Form, Icon, Input, Button, Upload,
} from 'antd';
import axios from 'axios';
import { FadeInRight } from '../../Styles';
import { serverIp } from '../../Reusable/services';

const { Title, Paragraph } = Typography;
const FormItem = Form.Item;
const { TextArea } = Input;

class StepThreeForm extends React.Component {
	handleUpload = ({ file, onSuccess }) => {
		const { username } = this.props;
		const formData = new FormData();
		formData.append('username', username);
		formData.append('file', file);
		axios.post(`${serverIp}/add-file`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		}).then(() => {
			onSuccess('ok');
		}).catch((err) => {
			console.error(err);
		});
	}

	render() {
		const {
			onSubmit, prevStep,
		} = this.props;
		return (
			<FadeInRight>
				<Form onSubmit={onSubmit}>
					<Title>Last step!</Title>
					<Title level={3}>Add something from yourself!</Title>
					<Paragraph>(optional, can be changed later)</Paragraph>
					<FormItem label='Description' hasFeedback>
						<TextArea prefix={<Icon type='idcard' />} style={{ width: '50%' }} placeholder='Description' autosize />
					</FormItem>
					<FormItem label='Add profile picture'>
						<div className='dropbox' style={{ width: '50%', margin: 'auto' }}>
							<Upload customRequest={this.handleUpload}>
								<Button>
									<Icon type="upload" />
									Select File
								</Button>
							</Upload>
						</div>
					</FormItem>
					<Button onClick={prevStep}>Previous</Button>
					<Button type='primary' htmlType='submit'>Done</Button>
				</Form>
			</FadeInRight>
		);
	}
}

const StepThree = Form.create()(StepThreeForm);
export default StepThree;
