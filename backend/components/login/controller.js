module.exports = (app, db) => {
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
}