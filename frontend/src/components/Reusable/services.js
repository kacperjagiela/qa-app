const axios = require('axios');

export const serverIp = 'http://192.168.42.253:8080';

export const getUserData = username => (axios.get(`${serverIp}/profile/${username}`));

export const searchUser = username => (axios.get(`${serverIp}/search/${username}`));

export const getAllUsernames = () => (axios.get(`${serverIp}/search`));

export const getQuestions = id => (axios.get(`${serverIp}/questions/${id}`));

export const getLatestQuestions = () => (axios.get(`${serverIp}/home`));

export const checkForAvatar = username => (axios.get(`${serverIp}/checkAvatar/${username}`));

export const register = data => (axios.post(`${serverIp}/register`, data));

export const login = data => (axios.post(`${serverIp}/login`, data, { withCredentials: true }));

export const answerQuestion = (questionID, questionAnswer) => (axios.post(`${serverIp}/answer/${questionID}`, { answer: questionAnswer }));

export const askQuestion = (username, questionContent, askedBy) => (axios.post(`${serverIp}/ask/${username}`, { question: questionContent, asked: askedBy }));

export const changeDetails = (newDetails, username) => (axios.post(`${serverIp}/changeDetails/${username}`, { details: newDetails }));

export const generatePassword = (username, userEmail) => (axios.post(`${serverIp}/changePassword`, { user: username, email: userEmail }));

export const sendFile = (data, username) => (
	axios.post(`${serverIp}/updatePicture/${username}`, data, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	})
);
