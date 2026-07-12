# Auto-paying Skim client in plain Python.
# pip install 'x402[evm]' requests eth-account
# export SKIM_WALLET_PRIVATE_KEY=0x...   (Base wallet funded with USDC)

import os

import requests
from eth_account import Account
from x402 import x402ClientSync
from x402.client import max_amount
from x402.http.clients.requests import wrapRequestsWithPayment
from x402.mechanisms.evm.exact.register import register_exact_evm_client
from x402.mechanisms.evm.signers import EthAccountSigner

account = Account.from_key(os.environ["SKIM_WALLET_PRIVATE_KEY"])

client = x402ClientSync()
register_exact_evm_client(
    client,
    EthAccountSigner(account),
    policies=[max_amount(10_000)],  # cap: $0.01 in USDC atomic units
)
session = wrapRequestsWithPayment(requests.Session(), client)

res = session.post(
    "https://skim402.com/api/v1/read",
    json={"url": "https://en.wikipedia.org/wiki/HTTP_402", "mode": "basic"},
    timeout=60,
)
res.raise_for_status()
data = res.json()

print(data["metadata"]["title"])
print(data["markdown"])
