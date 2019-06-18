module.exports = (app, db)=>{
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
}