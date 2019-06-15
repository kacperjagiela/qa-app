const profile = require("./profile.js");
const getAllQuestions = require("./getAllQuestions.js");

module.exports = (app, db) => {
  profile(app, db);
  getAllQuestions(app, db);
};
