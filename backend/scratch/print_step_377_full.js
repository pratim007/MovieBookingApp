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
      if (step.step_index === 377) {
        if (step.content) {
          fs.writeFileSync("scratch/step_377_content.txt", step.content, "utf8");
          console.log("Wrote step 377 content to scratch/step_377_content.txt, length:", step.content.length);
        } else {
          console.log("Step 377 has no content field.");
        }
      }
    } catch (e) {
      console.error(e);
    }
  }
}
run();
