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
      if (step.tool_calls) {
        step.tool_calls.forEach(call => {
          if (call.name === "view_file" && call.args) {
            const args = typeof call.args === "string" ? JSON.parse(call.args) : call.args;
            if (args.AbsolutePath && args.AbsolutePath.includes("SignUpPage.jsx")) {
              console.log(`[Step ${step.step_index}] View call for SignUpPage.jsx`);
            }
          }
        });
      }
      if (step.type === "VIEW_FILE" && step.content && step.content.includes("SignUpPage.jsx")) {
        console.log(`[Step ${step.step_index}] VIEW_FILE Content length:`, step.content.length);
        console.log("Snippet:");
        console.log(step.content.substring(0, 500));
      }
    } catch (e) {}
  }
}
run();
