module.exports = (app, bcrypt, db)=>{
	// Register to app
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
					res.send("Created user");
				}
				connection.release();
			});
		});
	});
}