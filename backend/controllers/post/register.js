const saltRounds = 10;

module.exports = (app, bcrypt, db) => {
  // Register to app
  app.post("/register", (req, res) => {
    // same story here with db logic
    db.connection.getConnection((err, connection) => {
      connection.query(
        `SELECT * FROM QA_users WHERE username='${req.body.data.username}'`,
        (err, rows, fileds) => {
          if (err) throw err;
          if (rows[0]) {
            res.send("User exists");
          } else {
            bcrypt.genSalt(saltRounds, (err, salt) => {
              bcrypt.hash(req.body.data.password, salt, (err, hash) => {
                connection.query(`INSERT INTO QA_users (email, username, password, description) 
							VALUES ('${req.body.data.email}', '${req.body.data.username}', '${hash}', '${
                  req.body.data.description
                }')`);
              });
            });
            // you probably don't want to return just plain text to user, it's really hard to deal and stay consistent with on client
            // just return some json like :
            // {
            //	success: true,
            //	action: 'create_user',
            //	username
            res.send("Created user");
          }
          connection.release();
        }
      );
    });
  });
};
