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
};
