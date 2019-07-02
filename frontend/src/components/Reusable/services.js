const axios = require('axios');

const serverIp = 'http://127.0.0.1:8080';

export const getUserData = username => (axios.get(`${serverIp}/profile/${username}`));

export const getQuestions = id => (axios.get(`${serverIp}/questions/${id}`));

export const register = data => (axios.post(`${serverIp}/register`, data));

export const login = data => (axios.post(`${serverIp}/login`, data, { withCredentials: true }));

export const answerQuestion = (questionID, questionAnswer) => (axios.post(`${serverIp}/answer/${questionID}`, { answer: questionAnswer }));

export const askQuestion = (username, questionContent) => (axios.post(`${serverIp}/ask/${username}`, { question: questionContent }));

export const getLatestQuestions = () => (axios.post(`${serverIp}/home`, { numberOfUsers: 10, numberOfQuestions: 1 }));
