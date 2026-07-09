import fs from "fs";
import path from "path";

const startDir = "c:\\PRATIM";

function searchDir(dir) {
  try {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        if (file !== "node_modules" && file !== ".git" && file !== "dist" && file !== "build") {
          searchDir(fullPath);
        }
      } else {
        if (file.toLowerCase().includes("dummystyles.js")) {
          console.log(`Found file: ${fullPath} - size: ${stat.size} bytes`);
        }
      }
    });
  } catch (err) {
    // ignore
  }
}

console.log("Searching for dummyStyles.js recursively under c:\\PRATIM...");
searchDir(startDir);
