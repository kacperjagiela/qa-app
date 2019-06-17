module.exports = (app, bcrypt, db)=>{
	//Login to app
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
}