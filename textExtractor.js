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
    }

    for (const filePath of filePaths) {
      const fileContent = await fs.readFile(filePath, "utf8");
      const $ = cheerio.load(fileContent);

      const templateMatch = fileContent.match(templates[fileType]);
      const templateContent = templateMatch ? templateMatch[1].trim() : "";

      const textContent = $(templateContent)
        .map(function() {
          return $(this).text().trim();
        })
        .get()
        .join(" ");

      const textArray = textContent.split(/\r?\n/);
      const relativePath = path.relative(__dirname, filePath);
      const result = {
        fileName: relativePath,
        lines: textArray.map((line) => line.trim()).filter((line) => line !== ""),
      };

      // Update existingData with new content
      const fileName = result.fileName
        .split(result.fileName.includes("/") ? "/" : "\\")
        .at(-1)
        .replace(`.${fileType}`, "");
      result.lines.forEach((elem, index) => {
        existingData[`${fileName}.${index}_key${index}`] = elem;
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
    consoleUtils.error("Error reading/writing files:", error.message);
    return null;
  }
}

module.exports = { extractTextContent };
