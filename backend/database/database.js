const mysql = require("mysql");

class Database{
	constructor(){
		this.connection = mysql.createPool({
			connectionLimit: 10,
			host: "localhost",
			user: "test",
			password:"testtest",
			database: "projects"
		});
	}
}

module.exports = Database;