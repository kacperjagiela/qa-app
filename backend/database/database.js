const mysql = require('mysql');
const bcrypt = require('bcryptjs');

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
	// Get user data
	getUserData(username, callback) {
		this.pool.getConnection((err, connection) => {
			connection.query(`SELECT * FROM QA_users WHERE username='${username}'`, (err, result) => {
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
			connection.query(`SELECT * FROM QA_questions WHERE user_id=${id}`, (err, result) => {
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
					connection.query(`SELECT * FROM QA_questions WHERE user_id=${user.id} AND answer IS NOT NULL ORDER BY id DESC LIMIT 1`, (err, result) => {
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
	// Register
	registerUser(body, callback) {
		this.pool.getConnection((err, connection) => {
			connection.query(`SELECT * FROM QA_users WHERE username='${body.username}'`, (err, rows, fileds) => {
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
			connection.query(`SELECT * FROM QA_users WHERE username='${body.username}'`, (err, rows) => {
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
			connection.query(`UPDATE QA_questions SET answer='${answer}' WHERE id='${id}'`, (err, rows) => {
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
	askQuestion(username, question, callback){
		this.pool.getConnection((err, connection) => {
			connection.query(`INSERT INTO QA_questions(content, user_id) VALUES ('${question}', (SELECT id FROM QA_users WHERE username='${username}'))`, (err, rows) => {
				if (err) throw err;
				callback(null, true);
			})
			connection.release();
		})
	}
}

module.exports = Database;