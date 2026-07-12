# pip install llama-index-readers-skim
# export SKIM_WALLET_PRIVATE_KEY=0x...

from llama_index.readers.skim import SkimReader

reader = SkimReader()  # reads SKIM_WALLET_PRIVATE_KEY from the environment

documents = reader.load_data(urls=["https://en.wikipedia.org/wiki/HTTP_402"])
print(documents[0].text)
print(documents[0].metadata)

# Documents drop straight into any ingestion pipeline:
#
#   from llama_index.core import VectorStoreIndex
#   index = VectorStoreIndex.from_documents(documents)
