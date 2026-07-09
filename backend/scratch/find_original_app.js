import fs from "fs";
import readline from "readline";

async function run() {
  const logFile = "C:\\Users\\click\\.gemini\\antigravity-ide\\brain\\acbe5b02-4a7c-4e21-afb6-70a7e2636b5e\\.system_generated\\logs\\transcript.jsonl";
  const fileStream = fs.createReadStream(logFile);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    if (!line.trim()) continue;
    try {
      const step = JSON.parse(line);
      if (step.type === "VIEW_FILE" && step.content && step.content.includes("frontend/src/App.jsx")) {
        console.log(`[Step ${step.step_index}] VIEW_FILE App.jsx - length: ${step.content.length}`);
        console.log("Snippet:\n", step.content.substring(0, 1500));
      }
    } catch (e) {}
  }
}
run();
