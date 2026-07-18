// Auto-paying Skim client in plain JavaScript.
// npm install x402-axios@1.2.0 viem axios
//   (pin 1.2.0: x402-axios@1.2.1 depends on an unpublished x402 version)
// export SKIM_WALLET_PRIVATE_KEY=0x...   (Base wallet funded with USDC)

import { withPaymentInterceptor } from "x402-axios";
import { privateKeyToAccount } from "viem/accounts";
import axios from "axios";

// Any viem account works here — the env var name is just a convention,
// so use your own (e.g. MY_AGENT_PRIVATE_KEY) if it fits your project.
const wallet = privateKeyToAccount(process.env.SKIM_WALLET_PRIVATE_KEY);

// Optional spend ceiling: refuse any call priced above this, in USD.
// The interceptor pays whatever the 402 challenge asks, so check first.
const MAX_PRICE_USD = 0.02; // covers read $0.002, read/js $0.005, extract $0.015

async function assertAffordable(path) {
  const probe = await axios
    .post(\`https://skim402.com/api\${path}\`, {}, { validateStatus: () => true })
    .catch(() => null);
  const req = probe?.data?.accepts?.[0];
  if (req && Number(req.maxAmountRequired) / 1e6 > MAX_PRICE_USD) {
    throw new Error(\`Skim \${path} costs more than MAX_PRICE_USD\`);
  }
}

// Axios client that automatically pays 402 responses.
const skim = withPaymentInterceptor(
  axios.create({ baseURL: "https://skim402.com/api" }),
  wallet,
);

const { data } = await skim.post("/v1/read", {
  url: "https://en.wikipedia.org/wiki/HTTP_402",
});

console.log(data.metadata.title);
// Skim follows redirects: if finalUrl differs from the URL you asked for,
// you were redirected — cite finalUrl, not the original.
console.log(data.finalUrl);
console.log(data.markdown);
