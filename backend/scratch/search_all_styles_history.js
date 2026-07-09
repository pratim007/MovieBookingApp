import fs from "fs";
import path from "path";

const historyDir = "C:\\Users\\click\\AppData\\Roaming\\Code\\User\\History";

function run() {
  try {
    const subdirs = fs.readdirSync(historyDir);
    console.log(`Scanning ${subdirs.length} history folders...`);
    subdirs.forEach(subdir => {
      const fullSubdir = path.join(historyDir, subdir);
      const entriesPath = path.join(fullSubdir, "entries.json");
      if (!fs.existsSync(entriesPath)) return;

      try {
        const data = JSON.parse(fs.readFileSync(entriesPath, "utf8"));
        const resource = data.resource;
        if (resource && resource.toLowerCase().includes("dummystyles")) {
          console.log(`Resource: ${resource}`);
          const entries = data.entries || [];
          entries.forEach(entry => {
            console.log(`  File: ${entry.id}, Size: ${fs.statSync(path.join(fullSubdir, entry.id)).size} bytes, Time: ${new Date(entry.timestamp)}`);
          });
        }
      } catch (e) {}
    });
  } catch (err) {
    console.error(err);
  }
}
run();
