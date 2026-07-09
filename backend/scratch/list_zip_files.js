import fs from "fs";
import { execSync } from "child_process";

function run() {
  const zipFile = "C:\\Users\\click\\Downloads\\drive-download-20260703T124546Z-3-001.zip";
  if (!fs.existsSync(zipFile)) {
    console.error("ZIP file does not exist!");
    return;
  }
  try {
    const list = execSync(`tar -tf "${zipFile}"`, { encoding: "utf8" });
    fs.writeFileSync("scratch/zip_contents.txt", list, "utf8");
    console.log("Wrote ZIP contents to scratch/zip_contents.txt. Total files:", list.split("\n").length);
  } catch (err) {
    console.error("Failed to list ZIP:", err.message);
  }
}
run();
