module.exports = (app, db, upload) => {
	// Handle profile picture update
	app.post('/updatePicture/:username', upload.single('file'), (req, res) => {
		const file = req.file;
		if (file) {
			res.send(true);
		} else {
			res.send(false);
		}
	})
	// Handle question answer
	app.post('/answer/:id', (req, res) => {
		db.answerQuestion(req.params.id, req.body.answer, (err, result) => {
			if (result) {
				res.send('done');
			} else {
				res.send('error');
			}
		});
	})
	// Handle question asking
	app.post('/ask/:username', (req, res) => {
		db.askQuestion(req.params.username, req.body.question, req.body.asked, (err, result) => {
			if (result) {
				res.send(true);
			} else {
				res.send(false);
			}
		})
	});
	// Handle changing details
	app.post('/changeDetails/:username', (req, res) => {
		db.changeDetails(req.body.details, req.params.username, (err, result) => {
			res.send(result);
		})
	})
}