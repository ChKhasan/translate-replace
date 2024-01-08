const config = require("../../../translate.config");
const DEFAULT = [
  ".idea",
  ".nuxt",
  "node_modules",
  ".git",
  "helpersTranslation",
];
module.exports = config.ignorFiles || DEFAULT;
