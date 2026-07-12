# pip install langchain-skim
# export SKIM_WALLET_PRIVATE_KEY=0x...

from langchain_skim import SkimReader

reader = SkimReader()  # reads SKIM_WALLET_PRIVATE_KEY from the environment

markdown = reader.invoke({"url": "https://en.wikipedia.org/wiki/HTTP_402"})
print(markdown)

# SkimReader is a standard LangChain BaseTool — pass it in any agent's tools
# list and the agent can read the web, paying $0.002 per page.
