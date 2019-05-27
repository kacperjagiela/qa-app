import * as React from "react";
import { Typography, Form, Icon, Input, Button, Upload } from "antd"; // eslint-disable-line no-unused-vars
const { Title, Paragraph } = Typography; // eslint-disable-line no-unused-vars
import {FadeInRight} from "../../Styles"; // eslint-disable-line no-unused-vars
import axios from "axios";

const FormItem = Form.Item; // eslint-disable-line no-unused-vars
// eslint-disable-next-line no-unused-vars
const {TextArea} = Input;

class StepThreeForm extends React.Component{
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.normFile = this.normFile.bind(this);
		this.postFile = this.postFile.bind(this);
	}

	handleSubmit(){

	}

	normFile(e){
		console.log("Upload event:", e);
		if(Array.isArray(e)){
			return e;
		}
		return e && e.fileList;
	}

	async postFile(e){
		console.log(e);
		await axios.post("http://192.168.8.192:8080/add-file", {
			file: e.file
		}).then(res=>{
			console.log(res);
		});
	}

	render(){
		const { getFieldDecorator } = this.props.form;
		return(
			<FadeInRight>
				<Form >
					<Title>Last step!</Title>
					<Title level={3}>Add something from yourself!</Title>
					<Paragraph>(optional, can be changed later)</Paragraph>
					<FormItem label="Description" hasFeedback>
						<TextArea prefix={<Icon type="idcard" />} style={{width:"50%"}} placeholder="Description" onChange={e=>this.props.onChange(e, "description")} autosize/>
					</FormItem>
					<FormItem label="Add profile picture">
						<div className="dropbox" style={{width:"50%", margin:"auto"}}>
							{getFieldDecorator("dragger", {
								valuePropName: "fileList",
								getValueFromEvent: this.normFile,
							})(
								<Upload.Dragger name="files" multiple={false} customRequest={this.postFile}>
									<p className="ant-upload-drag-icon">
										<Icon type="inbox" />
									</p>
									<p className="ant-upload-text">Click or drag file to this area to upload</p>
									<p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
								</Upload.Dragger>
							)}
						</div>
					</FormItem>
					<Button onClick={this.props.prevStep}>Previous</Button>
					<Button type="primary" htmlType="submit">Done</Button>
				</Form>
			</FadeInRight>
		);
	}
}

const StepThree = Form.create()(StepThreeForm);
export default StepThree;