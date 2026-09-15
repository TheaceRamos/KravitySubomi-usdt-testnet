# KRAVITYSB USDT — TRON Shasta Testnet MVP

Mobile-first testnet prototype using the public Shasta wallet address supplied by the owner.

## Run
1. Install Node.js 18+.
2. Open this folder in a terminal.
3. Run `npm install`
4. Run `npm start`
5. On the same device open `http://localhost:3000`.

For phone testing on the same Wi-Fi, run the server on a computer and open its local IP with port 3000.

## Blockchain
- Network: TRON Shasta Testnet
- Deposit address: TYyHGjz9jwUM6bqsqaNqwhFqRoTtdQj49x
- TronGrid endpoint: https://api.shasta.trongrid.io
- The backend reads confirmed TRC-20 transfers to the deposit address.
- Withdrawal requests are deliberately queued only; no private key is stored or used by the server.

## Security
Never add a seed phrase or private key to this project, frontend code, environment variables, GitHub, or chat.
This is a testnet prototype, not a production custody system.
