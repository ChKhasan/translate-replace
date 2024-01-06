const config = require("../../../translate.config");
const DEFAULT = {
  content: [`{{$store.state.translations['`, `']}}`],
  placeholder: [`:placeholder="$store.state.translations['`, `']}}`],
};
module.exports = config.replace || DEFAULT;
