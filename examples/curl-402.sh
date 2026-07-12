#!/usr/bin/env bash
# See the x402 payment handshake with no wallet and no signup.
# The 402 response body contains the payment challenge an x402 client signs.

curl -i -X POST https://skim402.com/api/v1/read \
  -H 'content-type: application/json' \
  -d '{"url": "https://en.wikipedia.org/wiki/HTTP_402"}'

# Expected: HTTP/2 402 with a JSON body describing the required payment
# ($0.002 USDC on Base). To actually pay it, use any x402 client — see the
# other examples in this directory.
