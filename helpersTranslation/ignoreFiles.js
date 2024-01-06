const config = require("../../../translate.config");
const DEFAULT = [
  ".idea",
  ".nuxt",
  "node_modules",
  ".git",
  "helpersTranslation",
  // "static",
  // "store",
  // "plugins",
  // "mixins",
  // "api",
  // "assets",
];
module.exports = config.ignorFiles || DEFAULT;
