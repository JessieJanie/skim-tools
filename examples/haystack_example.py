# pip install skim-haystack
# export SKIM_WALLET_PRIVATE_KEY=0x...

from skim_haystack import SkimReader

reader = SkimReader()  # reads SKIM_WALLET_PRIVATE_KEY from the environment

result = reader.run(urls="https://en.wikipedia.org/wiki/HTTP_402")
doc = result["documents"][0]
print(doc.meta.get("title"))
print(doc.content)

# SkimReader is a standard Haystack component — wire it into any Pipeline.
