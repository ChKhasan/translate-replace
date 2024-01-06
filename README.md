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
    jsx: /<>([\s\S]*?)<\/>/,
  },
  replace: {
    content: [`{{$store.state.translations['`, `']}}`],
    placeholder: [`:placeholder="$store.state.translations['`, `']`],
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

## Replace Content

```bash
replace: {
    content: [`{{$store.state.translations['`, `']}}`],
    placeholder: [`:placeholder="$store.state.translations['`, `']`],
  },
  ```
  Replace with keyword:
  You can store the keywords in global data storage ie store or redux ( vue, react ) so you can replace the view you need
  This example is for translations stored in vue
  So
  You can get the translation object from translateFile.json
  ==> 
   ```bash
   translateFile.json
   ```
   ## This example is for vue store
   
```bash
export const state = () => ({
  translations: {
    your_json_key: 'your_text'
  },
})
```
You have to put
```bash
{{$store.state.translations['your_json_key']}}
```
Through these, you can get it as per your convenience
```bash
content: [`{{$store.state.translations['`, `']}}`],
placeholder: [`:placeholder="$store.state.translations['`, `']`],
```

   ## Example
Your file
```bash
# myFile.vue
<template lang="html">
  <div>
    <div>Your text</div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="css"></style>
```
Your config
```bash
module.exports = {
  fileTypes: ["vue", "html", "jsx"],
  fileTemplates: {
    html: /<html lang="en">([\s\S]*?)<\/html>/,
    vue: /<template lang="html">([\s\S]*?)<\/template>/,
    jsx: /<>([\s\S]*?)<\/>/,
  },
  replace: {
    content: [`{{$store.state.translations['`, `']}}`],
    placeholder: [`:placeholder="$store.state.translations['`, `']`],
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
```bash
# translateFile.json
{
  "myFile.0": "Your text"
}
```

## Replaced

```bash
<template lang="html">
  <div>
    <div>{{$store.state.translations['myFile.0']}}</div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="css"></style>
```