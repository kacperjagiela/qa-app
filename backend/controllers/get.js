module.exports = (app, db)=>{
	//Get user data
	app.get("/profile/:username", async (req, res)=>{
		db.getUserData(req.params.username, (err, result) => {
			if (err) throw err;
			res.send(result);
		});
	});

	//Get questions for user
	app.get("/questions/:id", (req, res)=>{
		db.getQuestions(req.params.id, (err, result) => {
			if (err) throw err;
			res.send(result);
		})
	});
}