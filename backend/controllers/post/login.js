module.exports = (app, bcrypt, db) => {
  //Login to app
  // same story here with db logic
  app.post("/login", (req, res) => {
    db.connection.getConnection((err, connection) => {
      connection.query(
        `SELECT * FROM QA_users WHERE username='${req.body.data.username}'`,
        (err, rows, fields) => {
          if (err) throw err;
          //Check if user with req.body.data.username exists
          // you'll probably want some validation here
          // you don't need else after first if, just have default return
          if (rows[0]) {
            //Compare hash with password
            // you can use destructuring here
            // const { password, username } = req.body.data;
            // much cleaner solution
            bcrypt.compare(
              req.body.data.password,
              rows[0].password,
              (err, result) => {
                if (result === true) {
                  res
                    .cookie("login", req.body.data.username, {
                      maxAge: 9999999,
                      HttpOnly: false
                    })
                    .send("Logged in");
                } else {
                  res.send("Wrong username or password");
                }
              }
            );
          } else {
            res.send("Wrong username or password");
          }
        }
      );
      connection.release();
    });
  });
};
