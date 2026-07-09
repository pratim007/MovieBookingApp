import fs from "fs";
import path from "path";

const historyDir = "C:\\Users\\click\\AppData\\Roaming\\Code\\User\\History";

function run() {
  try {
    const subdirs = fs.readdirSync(historyDir);
    subdirs.forEach(subdir => {
      const fullSubdir = path.join(historyDir, subdir);
      const entriesPath = path.join(fullSubdir, "entries.json");
      if (!fs.existsSync(entriesPath)) return;

      try {
        const data = JSON.parse(fs.readFileSync(entriesPath, "utf8"));
        const resource = data.resource;
        if (resource && resource.toLowerCase().includes("dummystyles")) {
          console.log(`Folder: ${subdir}`);
          console.log(`Resource: ${resource}`);
          const entries = data.entries || [];
          entries.forEach(entry => {
            const entryFile = path.join(fullSubdir, entry.id);
            if (fs.existsSync(entryFile)) {
              const stat = fs.statSync(entryFile);
              console.log(`  Entry ID: ${entry.id}, Timestamp: ${new Date(entry.timestamp)}, Size: ${stat.size} bytes`);
            }
          });
        }
      } catch (e) {}
    });
  } catch (err) {
    console.error(err);
  }
}
run();
