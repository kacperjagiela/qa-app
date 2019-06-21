const saltRounds = 10;

module.exports = (app, bcrypt, upload, db) =>{
	// Register
	app.post("/register", (req, res)=>{
		db.connection.getConnection((err, connection)=>{
			connection.query(`SELECT * FROM QA_users WHERE username='${req.body.username}'`, (err, rows, fileds)=>{
				if(err) throw err;
				if(rows[0]){
					res.send(false);
				}else{
					bcrypt.genSalt(saltRounds, (err, salt)=>{
						bcrypt.hash(req.body.password, salt, (err, hash)=>{
							connection.query(`INSERT INTO QA_users (email, username, password, description) 
							VALUES ('${req.body.email}', '${req.body.username}', '${hash}', '${req.body.description}')`)
						});
					});
					res.send(true);
				}
				connection.release();
			});
		});
	});
	// Login
	app.post("/login", (req, res)=>{
		console.log(req.body);
		db.connection.getConnection((err, connection)=>{
			connection.query(`SELECT * FROM QA_users WHERE username='${req.body.username}'`, (err, rows, fields)=>{
				if(err) throw err;
				//Check if user with req.body.username exists
				if(rows[0]){
					//Compare hash with password
					bcrypt.compare(req.body.password, rows[0].password, (err, result)=>{
						if(result===true){
							res.cookie("login", req.body.username, {maxAge:9999999, HttpOnly:false}).send("Logged in");
						}else{
							res.send("Wrong username or password");
						}
					});
				}else{
					res.send("Wrong username or password");
				}
			});
			connection.release();
		});
	});

	//TODO: handle file input
	app.post("/add-file", upload.single("file"), (req, res, next)=>{
		const file = req.file;
		if(file){
			res.send('done');
		}else{
			res.send('error')
		}
	});
}