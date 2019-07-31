import * as React from 'react';
import {
	Input, Button, Form, Avatar, Typography, Comment, Icon,
} from 'antd';
import { answerQuestion, serverIp, deleteQuestion } from '../services';
import { QuestionDiv } from '../../Styles';
import { getCookie } from '../cookies';

class Question extends React.Component {
	constructor(props) {
		super(props);
		const { question, username } = this.props;
		this.state = {
			user: username === getCookie('login'),
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

	handleDelete = (id) => {
		const { refresh } = this.props;
		deleteQuestion(id);
		refresh();
		console.log('delete');
	}

	render() {
		const { question, username, id } = this.props;
		const { answer, user } = this.state;
		return (
			<QuestionDiv>
				<Form onSubmit={this.handleAnswer}>
					<Comment
						avatar={(
							<a href={`/profile/${question.asked_by}`}>
								<Avatar icon='user' size='large' src={`${serverIp}/public/${question.asked_by}`} />
							</a>
						)}
						author={<a href={`/profile/${question.asked_by}`}>{question.asked_by}</a>}
						content={(
							question.content
						)}
					>
						{
							user
								?	(
									<Icon
										type="close-square"
										theme='twoTone'
										style={{
											fontSize: '16px', cursor: 'pointer', position: 'absolute', right: '50px', top: '10px',
										}}
										onClick={() => this.handleDelete(id)}
									/>
								)
								: null
						}
						{
							question.answer
								?	(
									<Comment
										avatar={(
											<a href={`/profile/${username}`}>
												<Avatar icon='user' size='large' src={`${serverIp}/public/${username}`} />
											</a>
										)}
										author={<a href={`/profile/${username}`}>{username}</a>}
										content={(
											<Typography.Paragraph>
												{question.answer}
											</Typography.Paragraph>
										)}
									/>
								)
								:	(
									<div>
										{
											username === getCookie('login')
												?	<Input onChange={e => this.onChange(e)} placeholder="Answer" />
												:	null
										}
									</div>
								)
						}
						{
							answer && !question.answer
								? <Button type='primary' htmlType='submit' style={{ float: 'right' }}>Answer!</Button>
								: null
						}
					</Comment>
				</Form>
			</QuestionDiv>
		);
	}
}

export default Question;
