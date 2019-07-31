module.exports = (app, db) => {
	//Get questions for user
	app.get('/questions/:id', (req, res) => {
		db.getQuestions(req.params.id, (err, result) => {
			if (err) throw err;
			res.send(result);
		});
	});
	// Allow deleting
	app.delete('/deleteQuestion', (req, res) => {
		console.log(req.body);
		db.deleteQuestion(req.body.questionID, result => {
			res.send(result);
		})
	})
}