import * as React from 'react';
import {
	Typography, Form, Icon, Input, Button, Upload,
} from 'antd';
import axios from 'axios';
import { FadeInRight } from '../../Styles';

const { Title, Paragraph } = Typography;
const FormItem = Form.Item;
const { TextArea } = Input;

class StepThreeForm extends React.Component {
	normFile = (e) => {
		if (Array.isArray(e)) {
			return e;
		}
		return e && e.fileList;
	}

	// TODO: upload file
	postFile = (e) => {
		const formData = new FormData();
		formData.append('file', e.file);
		axios.post('http://192.168.8.192:8080/add-file', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
	}

	render() {
		const {
			form, onSubmit, onChange, prevStep,
		} = this.props;
		return (
			<FadeInRight>
				<Form onSubmit={onSubmit}>
					<Title>Last step!</Title>
					<Title level={3}>Add something from yourself!</Title>
					<Paragraph>(optional, can be changed later)</Paragraph>
					<FormItem label='Description' hasFeedback>
						<TextArea prefix={<Icon type='idcard' />} style={{ width: '50%' }} placeholder='Description' onChange={e => onChange(e, 'description')} autosize />
					</FormItem>
					<FormItem label='Add profile picture'>
						<div className='dropbox' style={{ width: '50%', margin: 'auto' }}>
							{form.getFieldDecorator('dragger', {
								valuePropName: 'fileList',
								getValueFromEvent: this.normFile,
							})(
								<Upload.Dragger name='file' multiple={false} action='http://192.168.8.192:8080/add-file'>
									<p className='ant-upload-drag-icon'>
										<Icon type='inbox' />
									</p>
									<p className='ant-upload-text'>Click or drag file to this area to upload</p>
									<p className='ant-upload-hint'>Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
								</Upload.Dragger>,
							)}
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
