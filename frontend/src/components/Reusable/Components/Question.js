import * as React from 'react';
import {
	Input, Button, Form, Avatar, Typography,
} from 'antd';
import { answerQuestion, serverIp } from '../services';
import { QuestionDiv } from '../../Styles';
import { getCookie } from '../cookies';

class Question extends React.Component {
	constructor(props) {
		super(props);
		const { question } = this.props;
		this.state = {
			answer: question.answer,
		};
	}

	onChange = (e) => {
		this.setState({
			answer: e.target.value,
		});
	}

	handleAnswer = (e) => {
		e.preventDefault();
		const { question, refresh } = this.props;
		const { answer } = this.state;
		answerQuestion(question.id, answer);
		refresh();
	}

	render() {
		const { question, username } = this.props;
		const { answer } = this.state;
		return (
			<QuestionDiv>
				<Form onSubmit={this.handleAnswer}>
					<Typography.Paragraph style={{ marginBottom: '0' }}>
						<a href={`/profile/${question.asked_by}`}>
							<Avatar icon='user' size='large' src={`${serverIp}/public/${question.asked_by}`} />
							{` ${question.asked_by} `}
						</a>
						asked:
					</Typography.Paragraph>
					<Typography.Paragraph style={{ textIndent: '40px' }}>
						{question.content}
					</Typography.Paragraph>
					{
						question.answer
							? (
								<Typography.Paragraph style={{ marginBottom: '0' }}>
									<a href={`/profile/${username}`}>
										<Avatar icon='user' size='large' src={`${serverIp}/public/${username}`} />
										{` ${username} `}
									</a>
									answered:
								</Typography.Paragraph>
							)
							: null
					}
					<Typography.Paragraph style={username !== getCookie('login') ? { textIndent: '40px' } : { textIndent: 0 }}>
						{question.answer || username !== getCookie('login')
							? question.answer
							: <Input onChange={e => this.onChange(e)} placeholder="Answer" />}
						{answer && !question.answer
							? <Button type='primary' htmlType='submit' style={{ float: 'right' }}>Answer!</Button>
							: null}
					</Typography.Paragraph>
				</Form>
			</QuestionDiv>
		);
	}
}

export default Question;
