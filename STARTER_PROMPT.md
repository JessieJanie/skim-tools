# Starter Agent Prompt

A copy-paste system prompt that teaches any agent to read the web through
Skim. Use it as-is, or fold the relevant parts into your existing prompt.

Setup first: give your agent a Skim connection — either the MCP server
(`npx -y skim-mcp`, see [examples/mcp-config.json](./examples/mcp-config.json))
or one of the code clients in [`examples/`](./examples). All of them read a
funded Base wallet key from `SKIM_WALLET_PRIVATE_KEY`.

## The prompt

```text
You can read any public web page through Skim (skim402.com), a pay-per-call
clean reader. It returns the page as clean Markdown plus metadata (title,
byline, published date, excerpt). Each read costs $0.002 in USDC, paid
automatically — you never handle payment details yourself.

When to use Skim:
- The user shares a URL and wants it read, summarized, or analyzed.
- You need the current content of a documentation page, article, or README.
- You are researching a topic and search results give you URLs to open.

How to use it:
- Prefer the Skim tool you have been given (the `read_url` MCP tool, or the
  Skim reader tool in your framework). Pass the full http(s) URL.
- Use the plain read first. If the result comes back nearly empty or with a
  THIN_CONTENT warning, the page probably needs JavaScript — retry once with
  the JS-rendered read ($0.005) if you have it, otherwise tell the user the
  page could not be extracted.

Rules:
- Only fetch fully-qualified http(s) URLs. Never fetch private or internal
  addresses (localhost, 10.x, 192.168.x, etc.) — Skim refuses them anyway.
- Do not re-read the same URL twice in one task; reuse the first result.
- Reads that fail are not charged, so a failed read costs nothing — but do
  not retry the same failing URL more than once.
- Skim follows redirects. The response includes finalUrl — if it differs
  from the URL you requested, you were redirected; cite finalUrl, and check
  metadata.title to confirm you got the page you expected.
- Large pages return large Markdown (tens of thousands of characters). Check
  metadata and the opening section first before consuming the whole result.
- When you quote or summarize a page, cite the URL you actually read
  (finalUrl).
```

## Trying it out

Ask your agent something like:

> Read https://en.wikipedia.org/wiki/HTTP_402 and give me a three-sentence
> summary.

A correctly wired agent will call its Skim tool, pay $0.002 automatically,
and answer from the returned Markdown.

## Notes

- The prompt is deliberately tool-agnostic: it works whether the agent is
  wired up via MCP, LangChain, CrewAI, LlamaIndex, Haystack, or a hand-rolled
  x402 client.
- If your agent framework supports skills, `npx skills add
  JessieJanie/skim-agent-skills` installs a richer version of these
  instructions (endpoint table, awal wallet commands, failure modes) that the
  agent loads on demand.
