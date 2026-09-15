const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3000;
const DEPOSIT_ADDRESS = "TYyHGjz9jwUM6bqsqaNqwhFqRoTtdQj49x";
const TRONGRID = "https://api.shasta.trongrid.io";
const USDT_TEST_CONTRACT = "TG3XXyExBkPp9nzdajDZsozEu4BkaSJozs";

app.get("/api/config", (req, res) => {
  res.json({
    network: "TRON Shasta Testnet",
    depositAddress: DEPOSIT_ADDRESS,
    usdtContract: USDT_TEST_CONTRACT
  });
});

app.get("/api/deposits", async (req, res) => {
  try {
    const url = `${TRONGRID}/v1/accounts/${DEPOSIT_ADDRESS}/transactions/trc20`;
    const r = await fetch(
      url + "?only_confirmed=true&limit=50&order_by=block_timestamp,desc"
    );

    if (!r.ok) throw new Error(`TronGrid returned ${r.status}`);

    const data = await r.json();

    const transfers = (data.data || []).filter(
      x =>
        String(x.token_info?.address || "").toLowerCase() ===
          USDT_TEST_CONTRACT.toLowerCase() &&
        String(x.to || "").toLowerCase() ===
          DEPOSIT_ADDRESS.toLowerCase()
    );

    res.json({ network: "Shasta", deposits: transfers });
  } catch (e) {
    res.status(502).json({
      error: "Could not read Shasta testnet data",
      detail: e.message
    });
  }
});

app.post("/api/withdrawals", (req, res) => {
  const { amount, destination } = req.body || {};

  if (!amount || Number(amount) <= 0) {
    return res.status(400).json({ error: "Enter a valid amount" });
  }

  if (!destination || !/^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(destination)) {
    return res.status(400).json({ error: "Enter a valid TRON address" });
  }

  res.status(202).json({
    status: "queued_for_testnet_signing",
    amount: Number(amount),
    destination,
    message:
      "Withdrawal request created. Sign/broadcast it with a dedicated test wallet."
  });
});

app.listen(PORT, "0.0.0.0", () =>
  console.log(`KRAVITYSB USDT trial running on port ${PORT}`)
);
