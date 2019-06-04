const multer = require("multer");
const upload = multer();

module.exports = app =>{
	//TODO: verify user in database
	app.post("/login", (req, res)=>{
		res.cookie("login", req.body.data.username, {maxAge:9999999, HttpOnly:false}).send("Logged in");
	});
	
	//TODO: handle file input
	app.post("/add-file", upload.single("file"), (req, res, next)=>{
		console.log(req.file);
		res.send("gucci");
	});
	app.post("/", (req, res)=>{
		res.send("git");
	});

	//TODO: handle register
}