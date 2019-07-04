const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const routeController = require('./components/controller.js');

const multer = require('multer');
const Database = require('./database/database.js');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'public');
	},
	filename: (req, file, cb) => {
		cb(null, req.body.username);
	}
});

const upload = multer({ storage: storage });
const db = new Database();
const app = express();

//Enable CORS, body-parser, cookie-parser
app.use(cookieParser(), bodyParser.urlencoded({extended:true}), bodyParser.json());
app.use('/public', express.static('public'));
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', 'http://192.168.42.253:3000');
    response.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    response.header('Access-Control-Allow-Credentials', 'true');
    next();
});

//Initialize controller
routeController(app, db, upload);

app.listen(8080, '192.168.42.253', ()=>console.log('Listening on 8080..'));