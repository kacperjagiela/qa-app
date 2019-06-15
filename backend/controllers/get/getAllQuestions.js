module.exports = (app, db) => {
  app.get("/questions/:id", (req, res) => {
    // Just like I said in Database
    // This method body could be minified to
    // return await db.getAllQuestions(req.params.id)
    // and some error handling
    db.connection.getConnection((err, connection) => {
      connection.query(
        `SELECT * FROM QA_questions WHERE user_id=${req.params.id}`,
        (err, rows, fields) => {
          if (err) throw err;
          res.send(rows);
        }
      );
      connection.release();
    });
  });
};
