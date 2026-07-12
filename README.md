# Skim Tools

Every way to plug [Skim](https://skim402.com) into your agent stack, in one
place. Skim is the x402-native clean reader API: send a URL, get back
agent-ready Markdown plus structured metadata. Each call costs **$0.002 in
USDC on Base**, paid automatically over HTTP 402 — no signup, no API key.

> Try it free in your browser first: <https://freeskims.skim402.com> — 10 free
> skims a day, no wallet needed.

## Pick your stack

| You use | Install | Package |
| --- | --- | --- |
| MCP client (Claude Desktop, Cursor, Cline, Zed, ...) | `npx -y skim-mcp` | [skim-mcp on npm](https://www.npmjs.com/package/skim-mcp) |
| Agent Skills (`npx skills add`) | `npx skills add JessieJanie/skim-agent-skills` | [skim-agent-skills](https://github.com/JessieJanie/skim-agent-skills) |
| LangChain | `pip install langchain-skim` | [langchain-skim on PyPI](https://pypi.org/project/langchain-skim/) |
| CrewAI | `pip install crewai-skim` | [crewai-skim on PyPI](https://pypi.org/project/crewai-skim/) |
| LlamaIndex | `pip install llama-index-readers-skim` | [llama-index-readers-skim on PyPI](https://pypi.org/project/llama-index-readers-skim/) |
| Haystack | `pip install skim-haystack` | [skim-haystack on PyPI](https://pypi.org/project/skim-haystack/) |
| Coinbase agentic wallet | `npx awal x402 pay ...` | [agentic-wallet-skills](https://github.com/coinbase/agentic-wallet-skills) |
| Plain JavaScript | `npm install x402-axios viem axios` | [examples/js-x402-axios.mjs](./examples/js-x402-axios.mjs) |
| Plain Python | `pip install 'x402[evm]' requests eth-account` | [examples/python-x402.py](./examples/python-x402.py) |
| Just curl | — | [examples/curl-402.sh](./examples/curl-402.sh) |

Every integration needs the same single credential: a Base wallet funded with
a little USDC, supplied as the `SKIM_WALLET_PRIVATE_KEY` environment variable.
$1 funds roughly 500 reads. Wallet setup walkthrough:
<https://skim402.com/wallet>.

**Use a fresh, dedicated wallet — never your personal one.** The key signs
$0.002 payment authorizations locally; treat it like a hot wallet for tolls.

## The API in one paragraph

`POST https://skim402.com/api/v1/read` with `{"url": "https://..."}` returns
`402 Payment Required` with an x402 challenge; your client signs a USDC
authorization and retries; Skim returns `{ markdown, text, metadata, ... }`.
Also available: `GET /api/v2/read?url=...` ($0.002), `GET /api/v2/read/js?url=...`
(JavaScript-rendered, $0.005), and `POST /api/v2/extract` (typed JSON via your
JSON Schema, $0.015). Full docs: <https://skim402.com/docs>.

## Starter agent prompt

Want your agent to actually reach for Skim at the right moments? Copy the
system prompt in [`STARTER_PROMPT.md`](./STARTER_PROMPT.md) — it tells the
agent when to read a page, how to handle thin results, and what not to do.

## Examples

Runnable snippets for each path are in [`examples/`](./examples):

- [`curl-402.sh`](./examples/curl-402.sh) — see the raw 402 handshake, no wallet needed
- [`js-x402-axios.mjs`](./examples/js-x402-axios.mjs) — auto-paying axios client
- [`python-x402.py`](./examples/python-x402.py) — auto-paying requests session
- [`langchain_example.py`](./examples/langchain_example.py)
- [`crewai_example.py`](./examples/crewai_example.py)
- [`llamaindex_example.py`](./examples/llamaindex_example.py)
- [`haystack_example.py`](./examples/haystack_example.py)
- [`mcp-config.json`](./examples/mcp-config.json) — drop-in MCP client config

## Official listings

- MCP Registry: `io.github.JessieJanie/skim402`
- CrewAI: `SkimReaderTool` submission to `crewAIInc/crewAI` (in review)
- x402 Bazaar: discoverable as an x402 service on Base

## License

MIT
