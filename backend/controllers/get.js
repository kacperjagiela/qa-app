module.exports = (app, db)=>{
	//Get user data
	app.get('/profile/:username', async (req, res) => {
		db.getUserData(req.params.username, (err, result) => {
			if (err) throw err;
			res.send(result);
		});
	});

	//Get questions for user
	app.get('/questions/:id', (req, res) => {
		db.getQuestions(req.params.id, (err, result) => {
			if (err) throw err;
			res.send(result);
		});
	});

	// Get 10 random users
	app.get('/home', (req, res) => {
		let allQuestions = [];
		const users = [];
		const getQuestions = (users) => {
			return new Promise((resolve, reject) => {
				db.getLatestQuestions(users, (error, questions) => {
					if (error) throw error;
					allQuestions = questions;
					resolve('ok');
				});
			});
		}
		const getUsers = new Promise((resolve, reject) => {
			db.getRandomUsers(10, (err, result) => {
				if (err) throw err;
				result.forEach((user) => {
					users.push(user);
				});
				resolve(users);
			});
		});
		getUsers.then(result => {
			if (result) {
				getQuestions(result).then(() => {
					res.send({
						questions: allQuestions,
						users: users
					});
				});
			}
		}).catch(err => err);
	});
	// Get all usernames
	app.get('/search', (req, res) => {
		db.getAllUsernames((err, result) => {
			res.send(result);
		});
	});
	// Search for user
	app.get('/search/:username', (req, res) => {
		db.searchUser(req.params.username, (err, result) => {
			if (result) res.send(result);
		})
	})

}