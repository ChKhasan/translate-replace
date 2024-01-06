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
This command will output all the text in your project to the ```translateFile.json ``` file in json format
!! Check the u file just in case

After this command, it is recommended to check the translations keywords, that the word to be replaced is not equal to the keyword, not equal to the component name, and so on.

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
## Templates

You choose or modify the templates depending on the environment you are using
For example:
```bash
  fileTemplates: {
    html: /<html lang="en">([\s\S]*?)<\/html>/,
    vue: /<template lang="html">([\s\S]*?)<\/template>/,
    jsx: /<>([\s\S]*?)<\/>/,
  },
```
```bash
/<html lang="en">([\s\S]*?)<\/html>/
```
For
```bash
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body></body>
</html>
```
So
```bash
# /<html lang="en">([\s\S]*?)<\/html>/ == <html lang="en"></html>
```
Only texts in <html lang="en"></html> are retrieved


```bash
<template lang="html">
  <div>
    <div>Your text</div>
  </div>
</template>
```
```bash
# /<template lang="html">([\s\S]*?)<\/template>/ == <template lang="html"></template>
```
Only texts in <template lang="html"></template> are retrieved

and for React

```bash
 return (
    <>
      <div>Your text</div>
    </>
  );
```
```bash
# /<>([\s\S]*?)<\/>/ == <></>
```

Only texts in <></> are retrieved

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