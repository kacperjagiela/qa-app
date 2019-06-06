const multer = require("multer");
const database = require("../../database/database.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const upload = multer();
const db = new database();

module.exports = app =>{
	//TODO: verify user in database
	app.post("/login", (req, res)=>{
		db.connection.getConnection((err, connection)=>{
			connection.query(`SELECT * FROM QA_users WHERE username='${req.body.data.username}'`, (err, rows, fields)=>{
				if(err) throw err;
				//Check if user with req.body.data.username exists
				if(rows[0]){
					//Compare hash with password
					bcrypt.compare(req.body.data.password, rows[0].password, (err, result)=>{
						if(result===true){
							res.cookie("login", req.body.data.username, {maxAge:9999999, HttpOnly:false}).send("Logged in");
						}else{
							res.send("Wrong username or password");
						}
					});
				}else{
					res.send("Wrong username or password");
				}
			});
		});
	});
	
	//TODO: handle file input
	app.post("/add-file", upload.single("file"), (req, res, next)=>{
		console.log(req.file);
		res.send();
	});
	app.post("/", (req, res)=>{
		res.send();
	});

	app.post("/register", (req, res)=>{
		db.connection.getConnection((err, connection)=>{
			connection.query(`SELECT * FROM QA_users WHERE username='${req.body.data.username}'`, (err, rows, fileds)=>{
				if(err) throw err;
				if(rows[0]){
					res.send("User exists");
				}else{
					bcrypt.genSalt(saltRounds, (err, salt)=>{
						bcrypt.hash(req.body.data.password, salt, (err, hash)=>{
							connection.query(`INSERT INTO QA_users (email, username, password, description) 
							VALUES ('${req.body.data.email}', '${req.body.data.username}', '${hash}', '${req.body.data.description}')`)
						});
					});
					res.send("Created");
				}
				connection.release();
			});
		});
	});
}