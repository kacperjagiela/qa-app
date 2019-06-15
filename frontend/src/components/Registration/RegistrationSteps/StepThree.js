import * as React from "react";
import { Typography, Form, Icon, Input, Button, Upload } from "antd"; // eslint-disable-line no-unused-vars
const { Title, Paragraph } = Typography; // eslint-disable-line no-unused-vars
import { FadeInRight } from "../../Styles"; // eslint-disable-line no-unused-vars
import axios from "axios";

const FormItem = Form.Item; // eslint-disable-line no-unused-vars
// eslint-disable-next-line no-unused-vars
const { TextArea } = Input;

class StepThreeForm extends React.Component {
  constructor(props) {
    super(props);
    // use anonymous functions in class methods and you will avoid this bullshit boilerplate
    this.normFile = this.normFile.bind(this);
    this.postFile = this.postFile.bind(this);
  }

  normFile(e) {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  // TODO: upload file

  async postFile(e) {
    let formData = new FormData();
    formData.append("file", e.file);
    // move it to service files
    await axios.post("http://192.168.8.192:8080/add-file", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <FadeInRight>
        <Form onSubmit={this.props.onSubmit}>
          <Title>Last step!</Title>
          <Title level={3}>Add something from yourself!</Title>
          <Paragraph>(optional, can be changed later)</Paragraph>
          <FormItem label="Description" hasFeedback>
            <TextArea
              prefix={<Icon type="idcard" />}
              style={{ width: "50%" }}
              placeholder="Description"
              onChange={e => this.props.onChange(e, "description")}
              autosize
            />
          </FormItem>
          <FormItem label="Add profile picture">
            <div className="dropbox" style={{ width: "50%", margin: "auto" }}>
              {getFieldDecorator("dragger", {
                valuePropName: "fileList",
                getValueFromEvent: this.normFile
              })(
                <Upload.Dragger
                  name="file"
                  multiple={false}
                  action="http://192.168.8.192:8080/add-file"
                >
                  <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                  <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibit from
                    uploading company data or other band files
                  </p>
                </Upload.Dragger>
              )}
            </div>
          </FormItem>
          <Button onClick={this.props.prevStep}>Previous</Button>
          <Button type="primary" htmlType="submit">
            Done
          </Button>
        </Form>
      </FadeInRight>
    );
  }
}

const StepThree = Form.create()(StepThreeForm);
export default StepThree;
