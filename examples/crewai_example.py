# pip install crewai-skim
# export SKIM_WALLET_PRIVATE_KEY=0x...

from crewai_skim import SkimReader

reader = SkimReader()  # reads SKIM_WALLET_PRIVATE_KEY from the environment

markdown = reader.run(url="https://en.wikipedia.org/wiki/HTTP_402")
print(markdown)

# SkimReader is a standard CrewAI BaseTool — add it to any agent's tools list:
#
#   researcher = Agent(role="Researcher", tools=[SkimReader()], ...)
