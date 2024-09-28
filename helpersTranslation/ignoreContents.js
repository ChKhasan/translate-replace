const config = require("../../../translate.config");
const DEFAULT = [
  "{{",
  "}}",
  "$t(",
  "{",
  "}",
];
module.exports = config.ignorContents || DEFAULT;
