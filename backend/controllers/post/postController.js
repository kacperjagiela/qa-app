const multer = require("multer");
const database = require("../../database/database.js");
const bcrypt = require("bcrypt");

//Require specific routes
const login = require("./login.js");
const register = require("./register.js");

const upload = multer();
const db = new database();

module.exports = app =>{
	login(app, bcrypt, db);
	register(app, bcrypt, db);
	//TODO: handle file input
	app.post("/add-file", upload.single("file"), (req, res, next)=>{
		console.log(req.file);
		res.send();
	});
}