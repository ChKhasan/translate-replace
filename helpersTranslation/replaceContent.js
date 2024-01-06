const config = require("../../../translate.config");
const DEFAULT = [`{{$store.state.translations['`, `']}}`];
module.exports = config.replaceContent || DEFAULT;
