const multer = require("multer");
const upload = multer();
const database = require("../../database/database.js");
const db = new database();

module.exports = app =>{
	//TODO: verify user in database
	app.post("/login", (req, res)=>{
		res.cookie("login", req.body.data.username, {maxAge:9999999, HttpOnly:false}).send("Logged in");
	});
	
	//TODO: handle file input
	app.post("/add-file", upload.single("file"), (req, res, next)=>{
		console.log(req.file);
		res.send();
	});
	app.post("/", (req, res)=>{
		res.send();
	});

	//TODO: handle register
	app.post("/register", (req, res)=>{
		db.connection.getConnection((err, connection)=>{
			connection.query("SELECT * FROM QA_users", (err, rows, fileds)=>{
				if(err) throw err;
				console.log(rows);
				connection.release();
			});
		});
		res.send();
	});
}