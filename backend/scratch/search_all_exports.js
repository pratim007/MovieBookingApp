import fs from "fs";
import readline from "readline";

async function run() {
  const logFile = "C:\\Users\\click\\.gemini\\antigravity-ide\\brain\\acbe5b02-4a7c-4e21-afb6-70a7e2636b5e\\.system_generated\\logs\\transcript.jsonl";
  const fileStream = fs.createReadStream(logFile);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  console.log("Searching logs for admin style exports...");
  for await (const line of rl) {
    if (!line.trim()) continue;
    try {
      const step = JSON.parse(line);
      const str = JSON.stringify(step);
      if (str.includes("styles2 =") || str.includes("styles3 =") || str.includes("styles5 =") || str.includes("addMoviePageStyles =")) {
        console.log(`[Step ${step.step_index}] Match found!`);
        if (step.tool_calls) {
          step.tool_calls.forEach(call => {
            console.log(`  Call: ${call.name}`);
            if (call.args) {
              const args = typeof call.args === "string" ? JSON.parse(call.args) : call.args;
              console.log("  Target:", args.TargetFile);
              if (args.CodeContent) {
                console.log("  Length:", args.CodeContent.length);
                fs.writeFileSync(`scratch/step_${step.step_index}_write.txt`, args.CodeContent, "utf8");
                console.log(`  Saved to scratch/step_${step.step_index}_write.txt`);
              }
            }
          });
        }
      }
    } catch (e) {}
  }
}
run();
