const fs = require("fs").promises;
const path = require("path");
const consoleUtils = require("./helpersTranslation/consoleUnits");
const templates = require("./helpersTranslation/fileTemplates");
const targetTags = require("./helpersTranslation/targetTags");
const textMaxLength = require("./helpersTranslation/textMaxLength");
const splitSymbol = require("./helpersTranslation/splitSymbol");
const generateJSONKey = require("./helpersTranslation/generateJSONKey");
const ignoreContents = require("./helpersTranslation/ignoreContents");
const cheerio = require('cheerio')
const replaceContent = require("./helpersTranslation/replace");
async function extractTextContent(filePaths, fileType) {
  try {
    const jsonFilePath = path.resolve(__dirname, "../../translateFile.json");
    let existingData = {};
    try {
      const existingJson = await fs.readFile(jsonFilePath, "utf8");
      if (existingJson.trim() !== "") {
        existingData = JSON.parse(existingJson);
      }
    } catch (readError) {
    }

    for (const filePath of filePaths) {
      const fileContent = await fs.readFile(filePath, "utf8");
      const templateMatch = fileContent.match(templates[fileType]);
      
      const templateContent = templateMatch ? templateMatch[1].trim() : "";

        const $ = cheerio.load(templateContent);
        const singleLineHTML = $.html().replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim();
        targetTags.forEach((tag,index) => {
          $(singleLineHTML).find(tag).each(function() {
            const text = $(this).text().trim();
            const cleanText = ignoreContents.some((item) => text.includes(item));
            const generateIndexs = Object.keys(existingData).map((elem) => {
              if(elem.includes(generateJSONKey)) 
                return elem.split(splitSymbol)[1] * 1
            }).filter((item) => item * 1);

            const maxIndex = generateIndexs.length ? Math.max(...generateIndexs):0
            const currentIndex = maxIndex ? maxIndex + 1:1
            
            if(text.length > 3 && !text.includes(replaceContent.content[0]) && !text.includes(replaceContent.content[1]) && !Object.values(existingData).includes(text) && !cleanText) {
              text.length <= textMaxLength ? existingData[text] = text:existingData[generateJSONKey+currentIndex] = text;
            }
          });
        });

    }

    console.table(existingData);
    await fs.writeFile(jsonFilePath, JSON.stringify(existingData, null, 2), {
      encoding: "utf8",
      flag: "w",
    });

    consoleUtils.success(
      "Files successfully processed. JSON file updated:",
      jsonFilePath
    );

    return existingData; 
  } catch (error) {
    consoleUtils.error("Error reading/writing files:", error);
    return null;
  }
}

module.exports = { extractTextContent };
