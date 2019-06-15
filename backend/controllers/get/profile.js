module.exports = (app, db) => {
  app.get("/profile/:username", (req, res) => {
    // Same story as in getAllQuestions
    db.connection.getConnection((err, connection) => {
      connection.query(
        `SELECT * FROM QA_users WHERE username='${req.params.username}'`,
        (err, rows, fields) => {
          if (err) throw err;
          if (rows[0]) {
            res.send(rows[0]);
          }
        }
      );
      connection.release();
    });
  });
};
