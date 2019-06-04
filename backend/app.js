const app = require("express")();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const postController = require("./controllers/post/postController.js");

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

postController(app);

app.listen(8080, "192.168.8.192", ()=>console.log("Listening on 8080.."));