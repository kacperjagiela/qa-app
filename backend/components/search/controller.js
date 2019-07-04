module.exports = (app, db) => {
	// Get all usernames
	app.get('/search', (req, res) => {
		db.getAllUsernames((err, result) => {
			res.send({ usernames: result });
		});
	});
	// Search for user
	app.get('/search/:username', (req, res) => {
		db.searchUser(req.params.username, (err, result) => {
			if (result) res.send(result);
		})
	})
}