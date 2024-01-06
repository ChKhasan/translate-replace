const config = require("../../../translate.config");

const DEFAULT = {
  html: /<html lang="en">([\s\S]*?)<\/html>/,
  vue: /<template lang="html">([\s\S]*?)<\/template>/,
};

module.exports = config.fileTemplates || DEFAULT;
