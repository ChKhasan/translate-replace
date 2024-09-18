const fs = require("fs").promises;
const path = require("path");
const cheerio = require("cheerio");
const consoleUtils = require("./helpersTranslation/consoleUnits");
const templates = require("./helpersTranslation/fileTemplates");

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
      // Обработка ошибки чтения JSON файла
    }
    
    for (const filePath of filePaths) {
      console.log("filePath",filePath);
      const fileContent = await fs.readFile(filePath, "utf8");
      const $ = cheerio.load(fileContent);

      const templateMatch = fileContent.match(templates[fileType]);
      const templateContent = templateMatch ? templateMatch[1].trim() : "";
  
      // Извлекаем текст из каждого тега, включая <option> по отдельности
      const textElements = [];
      $(templateContent).find('*').each(function() {
        if ($(this).text().trim()) {
          textElements.push($(this).text().trim());
        }
      });

      const relativePath = path.relative(__dirname, filePath);
      const result = {
        fileName: relativePath,
        lines: textElements, // Текстовые элементы по отдельности
      };

      // Обновляем existingData новыми данными
      const fileName = result.fileName
        .split(result.fileName.includes("/") ? "/" : "\\")
        .at(-1)
        .replace(`.${fileType}`, "");

      result.lines.forEach((elem, index) => {
        if(elem.length > 4) {
          existingData[`${fileName}.key${index}`] = elem;
          // `${elem}`.split(' ').length == 1 ? existingData[elem] = elem:
        }
      });
    }

    console.table(existingData);
    await fs.writeFile(jsonFilePath, JSON.stringify(existingData, null, 2), {
      encoding: "utf8",
      flag: "w",
    });

    consoleUtils.success(
      "Файлы успешно обработаны. JSON файл обновлен:",
      jsonFilePath
    );

    return existingData;
  } catch (error) {
    consoleUtils.error("Ошибка при чтении/записи файлов:", error.message);
    return null;
  }
}

module.exports = { extractTextContent };
