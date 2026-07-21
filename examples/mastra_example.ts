// npm install mastra-skim @mastra/core
// export SKIM_WALLET_PRIVATE_KEY=0x...   # Base wallet funded with USDC
import { Agent } from "@mastra/core/agent";
import { skimReaderTool } from "mastra-skim";

const agent = new Agent({
  id: "researcher",
  name: "Researcher",
  instructions:
    "When you need the contents of a web page, call skim_read with the URL. It returns clean Markdown plus metadata and costs $0.002 per call, paid automatically over x402.",
  model: "openai/gpt-5",
  tools: { skimReaderTool },
});

const result = await agent.generate(
  "Summarize https://www.paulgraham.com/greatwork.html in three bullet points.",
);
console.log(result.text);
