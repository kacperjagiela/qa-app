const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const strings = require('../functions/strings.js');
const Mailer = require('../components/mailer.js');

const mailer = new Mailer();

class Database {
	constructor(){
		this.pool = mysql.createPool({
			connectionLimit: 10,
			host: 'localhost',
			user: 'test',
			password:'testtest',
			database: 'projects'
		});
	}
	// Get all usernames
	getAllUsernames(callback) {
		this.pool.getConnection((err, connection) => {
			connection.query('SELECT username FROM QA_users', (err, result) => {
				if (result) callback (null, result);
			});
			connection.release();
		});
	}
	// Get user data
	getUserData(username, callback) {
		this.pool.getConnection((err, connection) => {
			connection.query(`SELECT * FROM QA_users WHERE username= ?`,
			[
				username
			],
			(err, result) => {
				if (result[0]){
					callback(null, result[0]);
				}else{
					callback(null);
				}
			});
			connection.release();
		})
	}
	// Get questions for user
	getQuestions(id, callback) {
		this.pool.getConnection((err, connection) => {
			connection.query(`SELECT * FROM QA_questions WHERE user_id=? ORDER BY id DESC`,
			[
				id
			],
			(err, result) => {
				if (result[0]) {
					callback(null, result);
				}
			});
			connection.release();
		})
	}
	// Get latest questions
	getLatestQuestions(users, callback) {
		this.pool.getConnection((err, connection) => {
			const questions = users.map( async user => {
				return new Promise((resolve, reject) => {
					connection.query(`SELECT * FROM QA_questions WHERE user_id=? AND answer IS NOT NULL ORDER BY id DESC LIMIT 1`,
					[
						user.id
					],
					(err, result) => {
						if (err) reject(err);
						if (result){
							resolve(result[0]);
						}
					})
				})
			})
			Promise.all(questions).then((complete) => {
				if (complete) {
					callback(null, complete);
				}
			})
			connection.release();
		});
	}
	// Get random users
	getRandomUsers(numberOfUsers, callback) {
		this.pool.getConnection((err, connection) => {
			connection.query(`SELECT * FROM QA_users ORDER BY RAND() LIMIT ${numberOfUsers}`, (err, result) => {
				if (result) {
					callback(null, result);
				}
			})
			connection.release();
		})
	}
	// Search user
	searchUser(username, callback){
		this.pool.getConnection((err, connection) => {
			connection.query(`SELECT * FROM QA_users WHERE username LIKE ?%`,
			[
				username
			],
			(error, result) => {
				if (result) {
					callback(null, result);
				}
			})
			connection.release();
		})
	}
	// Register
	registerUser(body, callback) {
		this.pool.getConnection((err, connection) => {
			connection.query(`SELECT * FROM QA_users WHERE username= ?`,
			[
				body.username
			],
			(err, rows, fileds) => {
				if (err) throw err;
				if (rows[0]) {
					callback(null, false);
				}else{
					bcrypt.genSalt(10, (err, salt)=>{
						bcrypt.hash(body.password, salt, (err, hash)=>{
							this.pool.query(`INSERT INTO QA_users (email, username, password, description) 
							VALUES ('${body.email}', '${body.username}', '${hash}', '${body.description}')`)
						});
					});
					callback(null, true)
				}
			});
			connection.release();
		})
	};
	// Login
	loginUser(body, callback) {
		this.pool.getConnection((err, connection) => {
			connection.query(`SELECT * FROM QA_users WHERE username=?`,
			[
				body.username
			],
			(err, rows) => {
				if (err) throw err;
				//Check if user with body.username exists
				if (rows[0]) {
					//Compare hash with password
					bcrypt.compare(body.password, rows[0].password, (err, result)=>{
						callback(null, result);
					});
				}else{
					callback(null, false);
				}
			});
			connection.release();
		})
	}
	// Handle question answer
	answerQuestion(id, answer, callback){
		this.pool.getConnection((err, connection) => {
			connection.query(`UPDATE QA_questions SET answer=? WHERE id=?`,
			[
				answer,
				id
			],
			(err, rows) => {
				if (err) throw err;
				if (rows[0]){
					callback(null, rows[0])
				}else{
					callback(null, false);
				}
			});
			connection.release();
		})
	}
	// Handle question asking
	askQuestion(username, question, asked, callback){
		this.pool.getConnection((err, connection) => {
			connection.query(`INSERT INTO QA_questions(content, user_id, asked_by) VALUES (?, (SELECT id FROM QA_users WHERE username=?), ?)`,
			[
				question,
				username,
				asked
			],
			(err, rows) => {
				if (err) throw err;
				callback(null, true);
			})
			connection.release();
		})
	}
	// Handle detail changing
	changeDetails(newDetails, username, callback){
		this.pool.getConnection((err, connection) => {
			const columns = [];
			const values = [];
			for (const [key, value] of Object.entries(newDetails)){
				columns.push(key);
				values.push(value)
			}
			connection.query(`UPDATE QA_users SET ?=? WHERE username=?`,
			[
				columns[0],
				values[0],
				username
			],
			(err, result) => {
				if (err) throw err;
				callback(null, true);
			})
			connection.release();
		})
	}
	// Generate new password
	generatePassword(username, email, callback){
		this.pool.getConnection((err, connection) => {
			this.getUserData(username, (error, res) => {
				if (err) callback(null, false);
				if (res.email === email){
					const newPassword = strings.generateString();
					bcrypt.genSalt(10, (err, salt)=>{
						bcrypt.hash(newPassword, salt, (err, hash)=>{
							this.pool.query(`UPDATE QA_users SET password = ? WHERE username = ?`, [hash, username]);
						});
						mailer.setDestination(res.email);
						mailer.addPassword(newPassword);
						mailer.sendMessage();
						mailer.reset();
						callback(null, true);
					});
				}
			});
			connection.release();
		});
	}
}

module.exports = Database;