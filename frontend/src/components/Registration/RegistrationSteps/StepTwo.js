import * as React from "react";
import { Typography, Form, Icon, Input, Button } from "antd"; // eslint-disable-line no-unused-vars
const { Title } = Typography; // eslint-disable-line no-unused-vars
import { FadeInRight } from "../../Styles"; // eslint-disable-line no-unused-vars

const FormItem = Form.Item; // eslint-disable-line no-unused-vars

class StepTwoForm extends React.Component {
  constructor(props) {
    super(props);
    // same story, use anonymous functions and you will avoid it
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
    this.checkConfirm = this.checkConfirm.bind(this);
    this.handleConfirmBlur = this.handleConfirmBlur.bind(this);
    // just use state = {}
    this.state = {
      confirmDirty: false
    };
  }

  // kinda weird to pass callbacks like this, I bet it can be done better and more readible, something like doIt.then()...
  checkPassword(rule, value, callback) {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  }
  checkConfirm(rule, value, callback) {
    const form = this.props.form;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  }

  handleConfirmBlur(e) {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields(err => {
      if (!err) {
        this.props.nextStep(e);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <FadeInRight>
        <Form onSubmit={this.handleSubmit}>
          <Title>Just a little bit more!</Title>
          <Title level={3}>Please enter your username and password.</Title>

          <FormItem label="Username" hasFeedback>
            {getFieldDecorator("userName", {
              rules: [
                {
                  required: true,
                  message: "Please enter your username!"
                }
              ]
            })(
              <Input
                prefix={<Icon type="user" />}
                style={{ width: "50%" }}
                placeholder="Username"
                onChange={e => this.props.onChange(e, "username")}
              />
            )}
          </FormItem>

          <FormItem label="Password" hasFeedback>
            {getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  message: "Please enter your password!"
                },
                {
                  validator: this.checkPassword
                }
              ]
            })(
              <Input
                prefix={<Icon type="lock" />}
                type="password"
                style={{ width: "50%" }}
                placeholder="Password"
                onChange={e => this.props.onChange(e, "password")}
              />
            )}
          </FormItem>

          <FormItem label="Confirm Password" hasFeedback>
            {getFieldDecorator("confirm", {
              rules: [
                {
                  required: true,
                  message: "Please confirm your password!"
                },
                {
                  validator: this.checkConfirm
                }
              ]
            })(
              <Input
                prefix={<Icon type="lock" />}
                type="password"
                style={{ width: "50%" }}
                placeholder="Confirm password"
                onBlur={this.handleConfirmBlur}
              />
            )}
          </FormItem>
          <Button onClick={this.props.prevStep}>Previous</Button>
          <Button type="primary" htmlType="submit">
            Next
          </Button>
        </Form>
      </FadeInRight>
    );
  }
}

const StepTwo = Form.create()(StepTwoForm);
export default StepTwo;
