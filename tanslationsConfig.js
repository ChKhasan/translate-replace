// Документация
// 1.В файле package.json в разделе "scripts" нужно написать "translate": "node translationsConfig.js"
// 2.Чтобы запустить переводы, введите `npm run translate Имя_файла Имя_папки`, 'имя файла и имя папки не являются обязательными' в терминале.
// 3.Применимые файлы
// - Файл html должен иметь тег html вида <html lang="en"></html>
// - Файл vue должен иметь тег html вида <template lang="html"><\template>
// 4.Для placeholders формы в конце нужно добавить ключевое слово _place, это условие для ключевых слов в админке

// const axios = require("axios");

module.exports = function () {
  const targetTags = require("./helpersTranslation/targetTags");
  const fs = require("fs");
  const path = require("path");
  const selectedValues = require("./toTranslate");
  const consoleUtils = require("./helpersTranslation/consoleUnits");
  const templates = require("./helpersTranslation/fileTemplates");
  const getTranslations = require("./helpersTranslation/translationsFile");
  const OUTSIDE_FILES = require("./helpersTranslation/outsideFiles");
  const replaceContent = require("./helpersTranslation/replace");
  const ignorFiles = require("./helpersTranslation/ignoreFiles");
  const cheerio = require('cheerio')
  const fileType = selectedValues[1] || "html";
  const folderName =
    selectedValues[0] == OUTSIDE_FILES ? undefined : selectedValues[0];
  const fileTemplate = templates[fileType];

  async function searchAndReplaceInFolder(folderName) {
    const scriptDirectory = __dirname;
    const grandparentDirectory = path.dirname(path.dirname(scriptDirectory));
  
    const targetDirectory = folderName
      ? path.join(grandparentDirectory, folderName)
      : grandparentDirectory;
    
    const files = fs.readdirSync(targetDirectory);
    if (files.length === 0) {
      consoleUtils.error("This folder is empty");
    } else {
      const texts = await getTranslations();
      const sortedTexts = Object.entries(texts).sort((a, b) => b[1].length - a[1].length);
      
      consoleUtils.info("Translations list:");
      console.table(sortedTexts);
  
      sortedTexts.forEach((item) => {
        let searchText = item[1];
        let replaceText = replaceContent.content[0] + item[0] + replaceContent.content[1];
        searchAndReplaceFiles(targetDirectory, searchText, replaceText);
      });
    }
  }
  async function searchAndReplaceFiles(
    directory,
    searchText,
    replaceText,
    textIndex,
    isPlace
  ) {
    try {
      const texts = await getTranslations();
      const files = fs.readdirSync(directory);
      files.forEach(async (file) => {
        const filePath = path.join(directory, file);
        const stats = fs.statSync(filePath);
        if (stats.isDirectory() && folderName && !ignorFiles.includes(file)) {
          consoleUtils.info(
            `${
              isPlace ? "[Placeholder]: " : ""
            }Searching for text ${textIndex} in folder named ${file}...`
          );
          searchAndReplaceFiles(filePath, searchText, replaceText, 2);
        } else if (stats.isFile() && file.endsWith(`.${fileType}`)) {
          if (!Object.keys(texts).includes(searchText)) {
            consoleUtils.info(
              `${
                isPlace ? "[Placeholder]: " : ""
              }Searching for text ${textIndex} in file named ${file}...`
            );
            let content = fs.readFileSync(filePath, "utf-8");
            const updatedContent = replaceTextInVueTemplate(
              content,
              searchText,
              replaceText
            );
            if (updatedContent !== content) {
              consoleUtils.success(
                `Replaced text ${textIndex} in file: ${filePath}`
              );
            }

            fs.writeFileSync(filePath, updatedContent, "utf-8");
          } else {
            consoleUtils.error(
              `"${searchText}" text can be equal to one of the keywords please check !!!`
            );
          }
        }
      });
    } catch (e) {
      consoleUtils.error(`The folder named "${folderName}" was not found!`);
    }
  }
  function searchAndReplaceFiles(directory, searchText, replaceText) {
    const files = fs.readdirSync(directory);
    
    files.forEach((file) => {
      const filePath = path.join(directory, file);
      const stats = fs.statSync(filePath);
  
      if (stats.isDirectory() && folderName && !ignorFiles.includes(file)) {
        searchAndReplaceFiles(filePath, searchText, replaceText);
      } else if (stats.isFile() && file.endsWith(`.${fileType}`)) {
        const content = fs.readFileSync(filePath, "utf-8");
  
        // Обрабатываем HTML с помощью Cheerio
        const $ = cheerio.load(content);
  
        targetTags.forEach(tag => {
          $(tag).each(function () {
            const elementText = $(this).text().trim();
            const text = elementText.replace(/\s+/g, ' ').trim()
            if (text === searchText) {
              $(this).text(replaceText);
              consoleUtils.success(`Replaced text in tag <${tag}> in file: ${filePath}`);
            }
          });
        });
        
        const updatedContent = $.html();
        const deletedHtmlTegs = updatedContent.replace('<html><head>','').replace('</head><body></body></html>','')
        fs.writeFileSync(filePath, deletedHtmlTegs, "utf-8");
      }
    });
  }
  consoleUtils.success("Starting process...");
  searchAndReplaceInFolder(folderName);
};
