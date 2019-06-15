import * as React from "react";
import { Layout, Typography } from "antd"; // eslint-disable-line no-unused-vars
import { Cookies } from "react-cookie";
import axios from "axios";
import { Profilepic } from "../Styles"; // eslint-disable-line no-unused-vars

const { Content, Footer } = Layout; // eslint-disable-line no-unused-vars
const { Title, Paragraph, Text } = Typography; // eslint-disable-line no-unused-vars
const cookie = new Cookies();

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { questions: [] };
  }

  componentDidMount() {
    //Get profile information from backend
    // move all of the ips and urls to variables
    // move axios.get logic to some directory named services
    // name profilepic to profilePicture, always use camelCase
    // use destructuring
    // const { id, username, email, description, profilePicture } = res.data;
    axios
      .get(
        `http://192.168.8.192:8080/profile/${this.props.match.params.username}`
      )
      .then(res => {
        this.setState({
          id: res.data.id,
          username: res.data.username,
          email: res.data.email,
          description: res.data.description,
          profilepic: res.data.profilepic
        });
        //Get questions from backend
        axios
          .get(`http://192.168.8.192:8080/questions/${this.state.id}`)
          .then(res => {
            this.setState({ questions: res.data });
            console.log(this.state.questions);
          });
      });
  }

  render() {
    // same story as in AppWrapper.js
    // same story with styles, reuse it, because right now you are using inline styles, raw css and styled components
    // stay consistent!!!!
    if (cookie.get("login")) {
      return (
        <Layout style={{ minHeight: "100vh" }}>
          <Content
            style={{
              width: "80vw",
              paddingLeft: "10vw",
              height: "95vh",
              paddingTop: "5vh"
            }}
          >
            <a
              href="https://placeholder.com"
              style={{ float: "left", marginRight: "10px" }}
            >
              <Profilepic
                src="https://via.placeholder.com/100x100"
                alt="100x100"
              />
            </a>
            <Title level={2}>{this.state.username}</Title>
            <Paragraph strong> {this.state.description}</Paragraph>
            <div>
              {/* this can be moved to some function if it grows bigger */}
              {this.state.questions.map((question, i) => {
                return <p key={i}>{question.content}</p>;
              })}
            </div>
          </Content>
          <Footer>Created by Kacper Jagieła</Footer>
        </Layout>
      );
    } else {
      this.props.history.push("/home");
      return null;
    }
  }
}
