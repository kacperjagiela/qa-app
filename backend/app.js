const app = require("express")();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const getController = require("./controllers/get/controller.js");
const postController = require("./controllers/post/controller.js");

const multer = require("multer");
const database = require("./database/database.js");
const bcrypt = require("bcrypt");

const upload = multer();
const db = new database();

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

//Initialize controllers
getController(app,db);
postController(app, bcrypt, upload, db);

app.listen(8080, "192.168.8.192", ()=>console.log("Listening on 8080.."));