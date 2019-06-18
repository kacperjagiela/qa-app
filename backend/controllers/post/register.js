const saltRounds = 10;

module.exports = (app, bcrypt, db)=>{
	// Register to app
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
}