const axios = require('axios');

const serverIp = 'http://192.168.8.192:8080/';

export const register = data => (axios.post(`${serverIp}register`, data));

export const login = data => (axios.post(`${serverIp}login`, data, { withCredentials: true }));

export const answerQuestion = (questionID, questionAnswer) => (axios.post(`${serverIp}answer/${questionID}`, { answer: questionAnswer }));
