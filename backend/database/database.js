const mysql = require("mysql");

class Database {
  // Don't do Database.connnection.then( db => db.query())
  // Just define methods here like
  // Db.getAllQuestions() which would return Promise that would resolve to questions
  // You would end up having something like
  // await db.getAllQuestions() which is much more friendly way of writing code
  // and having everythings in one place
  // Later you can have something like base class of Database which would just define
  // the way of connecting to the database and you could create a repository which would
  // inherit from the Database class and would perform actions for the given type e.g questions
  constructor() {
    this.connection = mysql.createPool({
      connectionLimit: 10,
      host: "localhost",
      user: "test",
      password: "testtest",
      database: "projects"
    });
  }
}

module.exports = Database;
