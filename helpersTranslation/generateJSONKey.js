const config = require("../../../translate.config");

const DEFAULT = 'generate_key-';

module.exports = config.generateJSONKey || DEFAULT;
