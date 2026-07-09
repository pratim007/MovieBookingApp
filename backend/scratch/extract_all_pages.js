import fs from "fs";
import path from "path";
import readline from "readline";

async function run() {
  const logFile = "C:\\Users\\click\\.gemini\\antigravity-ide\\brain\\acbe5b02-4a7c-4e21-afb6-70a7e2636b5e\\.system_generated\\logs\\transcript.jsonl";
  const fileStream = fs.createReadStream(logFile);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  console.log("Searching logs for frontend Pages...");
  for await (const line of rl) {
    if (!line.trim()) continue;
    try {
      const step = JSON.parse(line);
      if (step.type === "VIEW_FILE" && step.content) {
        const pathMatch = step.content.match(/File Path:\s*`file:\/\/\/([^`]+)`/);
        if (pathMatch && pathMatch[1]) {
          const rawPath = pathMatch[1].replace(/\//g, "\\");
          if (rawPath.toLowerCase().includes("frontend\\src\\pages\\")) {
            console.log(`[Step ${step.step_index}] VIEW_FILE for ${rawPath} - length: ${step.content.length}`);
            
            // Extract lines
            const lines = step.content.split("\n");
            let cleanContent = "";
            let isCodeSection = false;
            let codeLines = [];

            for (const l of lines) {
              if (l.startsWith("Showing lines") || l.startsWith("The following code has been modified")) {
                isCodeSection = true;
                continue;
              }
              if (l.startsWith("The above content")) {
                isCodeSection = false;
                continue;
              }
              if (isCodeSection) {
                const lineMatch = l.match(/^\d+:\s?(.*)$/);
                if (lineMatch) {
                  codeLines.push(lineMatch[1]);
                }
              }
            }
            if (codeLines.length > 0) {
              console.log(`  Extracted ${codeLines.length} lines of code.`);
              // Print first 5 lines
              console.log("  Snippet:\n", codeLines.slice(0, 5).join("\n"));
            }
          }
        }
      }
    } catch (e) {}
  }
}
run();
