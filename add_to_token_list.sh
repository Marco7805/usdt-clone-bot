#!/bin/bash

echo "🤖 AUTOMAZIONE AGGIUNTA TOKEN LIST"
echo "=================================="

# Clona il repository
git clone https://github.com/solana-labs/token-list.git
cd token-list

# Crea directory per il logo
mkdir -p assets/mainnet/59qfawpS114aAY6wAu9RfZfP9wSShLc15rJSVZ5iGWrt

# Copia il logo
cp ../assets/usdt_logo.png assets/mainnet/59qfawpS114aAY6wAu9RfZfP9wSShLc15rJSVZ5iGWrt/logo.png

# Aggiungi l'entry al token list
echo '{
  "chainId": 101,
  "address": "59qfawpS114aAY6wAu9RfZfP9wSShLc15rJSVZ5iGWrt",
  "symbol": "USDT",
  "name": "Tether USD",
  "decimals": 6,
  "logoURI": "https://coin-images.coingecko.com/coins/images/325/large/Tether.png",
  "tags": [
    "stablecoin",
    "usd",
    "tether"
  ],
  "extensions": {
    "website": "https://tether.to",
    "coingeckoId": "tether",
    "serumV3Usdc": "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
    "serumV3Usdt": "77quYg4MGneUdjgXCunt9GgM1usmrxKY31twEy3WHwcS"
  }
}' >> src/tokens/solana.tokenlist.json

# Commit e push
git add .
git commit -m "Add USDT clone token 59qfawpS114aAY6wAu9RfZfP9wSShLc15rJSVZ5iGWrt"
git push origin main

echo "✅ Token aggiunto alla Solana Token List!"
echo "📍 Crea una Pull Request su GitHub"
