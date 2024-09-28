const config = require("../../../translate.config");

const DEFAULT = 100;

module.exports = config.textMaxLength || DEFAULT;
