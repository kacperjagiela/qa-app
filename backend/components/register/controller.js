module.exports = (app, db, upload) => {
	// Handle file input
	app.post('/add-file', upload.single('file'), (req, res)=> {
		const file = req.file;
		if (file) {
			res.send('done');
		} else {
			res.send('error')
		}
	});
	// Register
	app.post('/register', (req, res)=>{
		db.registerUser(req.body, (err, result)=>{
			if (err) throw err;
			res.send(result);
		})
	});
}