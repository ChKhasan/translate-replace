const fs = require("fs");
const path = require("path");
const ignoreFiles = require("./ignoreFiles");

const folderPath = path.resolve(__dirname, "../../..");
const OUTSIDE_FILES = require("./outsideFiles");
const folderNames = fs.readdirSync(folderPath).filter((file) => {
  const filePath = path.join(folderPath, file);
  if (fs.statSync(filePath).isDirectory() && !ignoreFiles.includes(file)) {
    return file;
  }
});
const folderNamesWith = [...folderNames, OUTSIDE_FILES];
module.exports = folderNamesWith;
