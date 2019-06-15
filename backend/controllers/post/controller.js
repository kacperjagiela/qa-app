//Require specific routes
const login = require("./login.js");
const register = require("./register.js");

// I would move stuff from controllers to directories based on components concept
// E.g you have directory named questions which contains its controller.js, repository.js and some other stuff
// like utility functions and u can also export all of it in index.js file, because there aren't tons of files
// it is much cleaner and consistent for smaller stuff
// also it doesn't make any sense to create directories for get and post requests
// image having tens of controllers and other stuff
// chaos
module.exports = (app, bcrypt, upload, db) => {
  login(app, bcrypt, db);
  register(app, bcrypt, db);
  //TODO: handle file input
  app.post("/add-file", upload.single("file"), (req, res, next) => {
    console.log(req.file);
    res.send();
  });
};
