const fs = require('fs');
const avatarPath = './public';

module.exports = (app, db) => {
	//Get user data
	app.get('/profile/:username', async (req, res) => {
		db.getUserData(req.params.username, (err, result) => {
			if (err) throw err;
			res.send(result);
		});
	});
			// Check if avatar exists
	app.get('/checkAvatar/:username', (req, res) => {
		fs.access(`${avatarPath}/${req.params.username}`, fs.F_OK, (err) =>{
			if (err) {
				res.send(false);
			} else{
				res.send(true);
			}
		});
	});
}