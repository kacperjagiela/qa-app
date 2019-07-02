import * as React from 'react';
import { Input, Button } from 'antd';
import { answerQuestion } from '../services';
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

	handleAnswer = () => {
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
				<p>{question.content}</p>
				{question.answer || username !== getCookie('login')
					? question.answer
					: <Input onChange={e => this.onChange(e)} placeholder="Answer" />}
				{answer && !question.answer
					? <Button type='primary' onClick={this.handleAnswer} style={{ float: 'right' }}>Answer!</Button>
					: null}
			</QuestionDiv>
		);
	}
}

export default Question;
