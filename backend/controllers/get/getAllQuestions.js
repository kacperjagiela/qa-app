module.exports = (app, db)=>{
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