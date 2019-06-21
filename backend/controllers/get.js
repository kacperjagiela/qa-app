module.exports = (app, db)=>{
	//Get user data
	app.get("/profile/:username", (req, res)=>{
		db.connection.getConnection((err, connection)=>{
			connection.query(`SELECT * FROM QA_users HAVING username = "${req.params.username}"`, (err, rows, fields)=>{
				if(err) throw err;
				if(rows[0]){
					res.send(rows[0]);
				}
			})
			connection.release();
		});
	});
	//Get questions for user
	app.get("/questions/:id", (req, res)=>{
		db.connection.getConnection((err, connection)=>{
			connection.query(`SELECT * FROM QA_questions WHERE user_id=${req.params.id}`, (err, rows, fields)=>{
				if (err) throw err;
				res.send(rows);
			})
			connection.release();
		});
	});
}