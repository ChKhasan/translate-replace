const config = require("../../../translate.config");

const DEFAULT = ["vue", "html", "jsx"];

module.exports = config.fileTypes || DEFAULT;
