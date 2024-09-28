const config = require("../../../translate.config");

const DEFAULT = 50;

module.exports = config.textMaxLength || DEFAULT;
