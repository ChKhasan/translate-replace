const config = require("../../../translate.config");

const DEFAULT = [
  'html', 'head', 'body', 'title', 'meta', 'link', 'style', 'script',
   'p', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'b',
  'strong', 'i', 'em', 'ul', 'ol', 'li', 'table', 'tr', 'td', 'th',
  'form', 'input', 'textarea', 'select', 'button', 'img', 'video',
  'audio', 'canvas', 'blockquote', 'cite', 'code', 'pre', 'footer',
  'header', 'section', 'article', 'nav'
]

module.exports = config.targetTags || DEFAULT;
