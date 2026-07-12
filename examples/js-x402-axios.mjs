// Auto-paying Skim client in plain JavaScript.
// npm install x402-axios viem axios
// export SKIM_WALLET_PRIVATE_KEY=0x...   (Base wallet funded with USDC)

import { withPaymentInterceptor } from "x402-axios";
import { privateKeyToAccount } from "viem/accounts";
import axios from "axios";

const wallet = privateKeyToAccount(process.env.SKIM_WALLET_PRIVATE_KEY);

// Axios client that automatically pays 402 responses.
const skim = withPaymentInterceptor(
  axios.create({ baseURL: "https://skim402.com/api" }),
  wallet,
);

const { data } = await skim.post("/v1/read", {
  url: "https://en.wikipedia.org/wiki/HTTP_402",
});

console.log(data.metadata.title);
console.log(data.markdown);
