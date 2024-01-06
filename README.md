# Translate replace

A simple npm package for translation and replacement.
This package is currently fully functional for vue and nuxt

## Installation

Install the package using npm:

```bash
npm install translate-replace
```

## Adding

We add start commands to Package.json:

```bash
 "scripts": {
    # ...
    "translate": "node node_modules/translate-replace/toTranslate.js",
    "cTranslate": "node node_modules/translate-replace/toCreateTranslate.js"
  },
  ```

## Start

We will take the texts from our first project, for this:

```bash
npm install cTranslate
```
This command will output all the text in your project to the ```bash translateFile.json ``` file in json format
!! Check the u file just in case

## Replace
Insert keywords:

```bash
npm install translate
```
This command replaces the text in the translateFile.json file with the text in the project

## Translate Config
You can adjust the settings you need from the settings file
```bash
translate.config
```

```bash
module.exports = {
  fileTypes: ["vue", "html", "jsx"],
  fileTemplates: {
    html: /<html lang="en">([\s\S]*?)<\/html>/,
    vue: /<template lang="html">([\s\S]*?)<\/template>/,
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
```
