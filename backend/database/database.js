const mysql = require("mysql");
const bcrypt = require("bcryptjs");

class Database {
	constructor(){
		this.pool = mysql.createPool({
			connectionLimit: 10,
			host: "localhost",
			user: "test",
			password:"testtest",
			database: "projects"
		});
	}
	// Get user data
	getUserData(username, callback) {
		this.pool.query(`SELECT * FROM QA_users WHERE username='${username}'`, (err, result) => {
			if (result[0]){
				callback(null, result[0]);
			}else{
				callback(null);
			}
		});
	}
	// Get questions for user
	getQuestions(id, callback) {
		this.pool.query(`SELECT * FROM QA_questions WHERE user_id=${id}`, (err, result) => {
			if(result[0]){
				callback(null, result);
			}
		});
	}
	// Register
	registerUser(body, callback){
		this.pool.query(`SELECT * FROM QA_users WHERE username='${body.username}'`, (err, rows, fileds) => {
			if(err) throw err;
			if(rows[0]){
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
	};
	// Login
	loginUser(body, callback){
		this.pool.query(`SELECT * FROM QA_users WHERE username='${body.username}'`, (err, rows) => {
			if(err) throw err;
			//Check if user with body.username exists
			if(rows[0]){
				//Compare hash with password
				bcrypt.compare(body.password, rows[0].password, (err, result)=>{
					callback(null, result);
				});
			}else{
				callback(null, false);
			}
		});
	}
	// Handle question answer
	answerQuestion(id, answer, callback){
		this.pool.query(`UPDATE QA_questions SET answer='${answer}' WHERE id='${id}'`, (err, rows) => {
			if (err) throw err;
			if(rows[0]){
				callback(null, rows[0])
			}else{
				callback(null, false);
			}
		});
	}
	// Handle question asking
	askQuestion(username, question, callback){
		this.pool.query(`INSERT INTO QA_questions(content, user_id) VALUES ('${question}', (SELECT id FROM QA_users WHERE username='${username}'))`, (err, rows) => {
			if (err) throw err;
			callback(null, true);
		})
	}
}

module.exports = Database;