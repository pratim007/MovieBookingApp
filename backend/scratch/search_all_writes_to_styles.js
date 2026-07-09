import fs from "fs";
import readline from "readline";

async function run() {
  const logFile = "C:\\Users\\click\\.gemini\\antigravity-ide\\brain\\acbe5b02-4a7c-4e21-afb6-70a7e2636b5e\\.system_generated\\logs\\transcript.jsonl";
  const fileStream = fs.createReadStream(logFile);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  console.log("Searching logs for writes/edits to admin dummyStyles.js...");
  for await (const line of rl) {
    if (!line.trim()) continue;
    try {
      const step = JSON.parse(line);
      if (step.tool_calls) {
        step.tool_calls.forEach(call => {
          if (call.args) {
            const args = typeof call.args === "string" ? JSON.parse(call.args) : call.args;
            const target = args.TargetFile || args.AbsolutePath;
            if (target && target.toLowerCase().includes("dummystyles.js") && target.toLowerCase().includes("admin")) {
              console.log(`[Step ${step.step_index}] Tool call: ${call.name}`);
              console.log("Arguments:\n", JSON.stringify(args, null, 2).substring(0, 1500));
            }
          }
        });
      }
    } catch (e) {}
  }
}
run();
