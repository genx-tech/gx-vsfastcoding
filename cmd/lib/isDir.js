const fs = require("fs");

module.exports = (path) => fs.lstatSync(path).isDirectory();
