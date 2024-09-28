module.exports = {
  fileTypes: ["vue", "html", "jsx"],
  fileTemplates: {
    html: /<html lang="en">([\s\S]*?)<\/html>/,
    vue: /<template lang="html">([\s\S]*?)<\/template>/,
    jsx: /<>([\s\S]*?)<\/>/,
  },
  replace: {
    content: [`{{$store.state.translations['`, `']}}`],
    placeholder: [`:placeholder="$store.state.translations['`, `']}}`],
  },
  ignorFiles: [
    ".idea",
    ".nuxt",
    "node_modules",
    ".git",
    "static",
    "store",
    "plugins",
    "mixins",
    "api",
    "assets",
    "helpersTranslation",
  ],
  targetTags: [
    'html', 'head', 'body', 'title', 'meta', 'link', 'style', 'script',
     'p', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'b',
    'strong', 'i', 'em', 'ul', 'ol', 'li', 'table', 'tr', 'td', 'th',
    'form', 'input', 'textarea', 'select', 'button', 'img', 'video',
    'audio', 'canvas', 'blockquote', 'cite', 'code', 'pre', 'footer',
    'header', 'section', 'article', 'nav'
  ],
  ignoreContents: ['{{','}}','$t('],
  textMaxLength: 200,
  generateJSONKey: 'generate_key-',
  splitSymbol: '-'
};
