const saltRounds = 10;

module.exports = (app, upload, db) =>{
	// Register
	app.post('/register', (req, res)=>{
		db.registerUser(req.body, (err, result)=>{
			if (err) throw err;
			res.send(result);
		})
	});
	// Login
	app.post('/login', (req, res)=>{
		db.loginUser(req.body, (err, result) => {
			if (err) throw err;
			if (result) {
				res.cookie('login', req.body.username, {maxAge:9999999, HttpOnly:false}).send('Logged in');
			} else {
				res.send('Wrong username or password');
			}
		})
	});
	// Handle file input
	app.post('/add-file', upload.single('file'), (req, res, next)=>{
		const file = req.file;
		if (file) {
			res.send('done');
		} else {
			res.send('error')
		}
	});
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
		db.askQuestion(req.params.username, req.body.question, (err, result) => {
			if (result) {
				res.send(true);
			} else {
				res.send(false);
			}
		})
	})
	// Get 10 random users
	app.post('/home', async (req, res) => {
		console.log(req.body);
		const questions = [];
		const users = [];
		await db.getRandomUsers(req.body.numberOfUsers, (err, result) => {
			if (err) throw err;
			result.forEach(user => {
				users.push(user);
				db.getLatestQuestions(user.id, req.body.numberOfQuestions, (error, question) => {
					if (error) throw error;
					questions.push(question);
				});
			});
		});
		res.send({
			questions: questions,
			users: users
		});
	})
}