const app = require("express")();
const multer = require("multer");
const upload = multer();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

//Enable CORS, body-parser, cookie-parser
app.use(cookieParser(), bodyParser.urlencoded({extended:true}), bodyParser.json());

app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "http://192.168.8.192:3000");
    response.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    response.header("Access-Control-Allow-Credentials", "true");
    next();
});

app.post("/login", (req, res)=>{
	res.cookie("login", req.body.data.username, {maxAge:9999999, HttpOnly:false}).send("Logged in");
});

app.post("/add-file", upload.single("file"), (req, res, next)=>{
	console.log(req.file);
	res.send("gucci");
});

app.listen(8080, "192.168.8.192", ()=>console.log("Listening on 8080.."));