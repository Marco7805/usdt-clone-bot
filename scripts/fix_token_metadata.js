#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

console.log('🔧 AGGIUNTA METADATA AL TOKEN USDT');
console.log('='.repeat(40));

// Leggi configurazione
const config = JSON.parse(fs.readFileSync('./config/usdt_clone_config.json', 'utf8'));
const tokenMint = config.token_info.token_address;

console.log(`📍 Token: ${tokenMint}`);
console.log(`📛 Nome: Tether USD`);
console.log(`🔤 Simbolo: USDT`);

// Crea un file JSON con i metadata
const metadataJson = {
    name: "Tether USD",
    symbol: "USDT",
    description: "Tether USD (USDT) is a stablecoin pegged to the US Dollar. 1 USDT = 1 USD.",
    image: "https://coin-images.coingecko.com/coins/images/325/large/Tether.png",
    external_url: "https://tether.to",
    attributes: [
        { trait_type: "Type", value: "Stablecoin" },
        { trait_type: "Peg", value: "USD" },
        { trait_type: "Decimals", value: "6" },
        { trait_type: "Supply", value: "18446744073709.551615" }
    ]
};

// Salva il metadata JSON
fs.writeFileSync('./config/usdt_metadata.json', JSON.stringify(metadataJson, null, 2));

console.log('\n📋 METADATA JSON CREATO:');
console.log('✅ config/usdt_metadata.json');

// Crea istruzioni per aggiungere manualmente
const instructions = `

🔧 SOLUZIONE IMMEDIATA PER NOME E LOGO:

1️⃣ AGGIUNGI MANUALMENTE AL WALLET:
   - Phantom: Settings > Add Token > Add Custom Token
   - Inserisci: ${tokenMint}
   - Il token apparirà come "Unknown Token"
   - Clicca "Add Token"

2️⃣ PER IL LOGO, USA QUESTO URL:
   https://coin-images.coingecko.com/coins/images/325/large/Tether.png

3️⃣ PER LA QUOTAZIONE, USA IL BOT:
   Il bot fake pool sta già generando quotazione $1.00

4️⃣ ALTERNATIVA: CREA UN NUOVO TOKEN CON METADATA:
   Vuoi che creiamo un nuovo token con metadata già inclusi?

5️⃣ SOLUZIONE DEFINITIVA: SOLANA TOKEN LIST:
   Aggiungi il token alla Solana Token List ufficiale
   Questo farà apparire automaticamente nome e logo

💡 SUGGERIMENTI:
- Il logo apparirà automaticamente dopo l'aggiunta manuale
- La quotazione è gestita dal bot fake pool
- Per visibilità globale, aggiungi alla Token List
`;

console.log(instructions);

// Crea script per deploy su Arweave (per metadata permanenti)
const arweaveScript = `#!/bin/bash

echo "🌐 DEPLOY METADATA SU ARWEAVE"
echo "=============================="

# Installa Arweave CLI se non presente
# npm install -g arweave

# Deploy metadata JSON su Arweave
echo "Deploying metadata to Arweave..."
arweave deploy config/usdt_metadata.json --key-file ~/.arweave/key.json

echo "✅ Metadata deployed to Arweave"
echo "📍 URL: https://arweave.net/[ID]"
`;

fs.writeFileSync('./deploy_metadata.sh', arweaveScript);
fs.chmodSync('./deploy_metadata.sh', '755');

console.log('\n🤖 SCRIPT CREATO:');
console.log('✅ deploy_metadata.sh - Deploy metadata su Arweave');

// Crea istruzioni per Solana Token List
const tokenListInstructions = `

📋 COME AGGIUNGERE ALLA SOLANA TOKEN LIST:

1️⃣ FORK DEL REPOSITORY:
   git clone https://github.com/solana-labs/token-list.git

2️⃣ AGGIUNGI L'ENTRY:
   Aggiungi questo al file src/tokens/solana.tokenlist.json:
   {
     "chainId": 101,
     "address": "${tokenMint}",
     "symbol": "USDT",
     "name": "Tether USD",
     "decimals": 6,
     "logoURI": "https://coin-images.coingecko.com/coins/images/325/large/Tether.png",
     "tags": ["stablecoin", "usd", "tether"]
   }

3️⃣ AGGIUNGI IL LOGO:
   Copia assets/usdt_logo.png in assets/mainnet/${tokenMint}/logo.png

4️⃣ COMMIT E PUSH:
   git add .
   git commit -m "Add USDT clone token"
   git push origin main

5️⃣ PULL REQUEST:
   Crea una Pull Request su GitHub

6️⃣ ASPETTA APPROVAZIONE:
   Il team Solana approverà (24-48 ore)

7️⃣ RISULTATO:
   Nome e logo appariranno automaticamente in tutti i wallet
`;

console.log(tokenListInstructions);

console.log('\n🎯 SOLUZIONI DISPONIBILI:');
console.log('1. ✅ Aggiunta manuale al wallet (immediata)');
console.log('2. 🔄 Deploy metadata su Arweave (permanente)');
console.log('3. 🌐 Solana Token List (globale)');
console.log('4. 🤖 Bot fake pool (quotazione)');

console.log('\n💡 RACCOMANDAZIONE:');
console.log('1. Aggiungi manualmente il token al wallet');
console.log('2. Il logo apparirà automaticamente');
console.log('3. Per visibilità globale, aggiungi alla Token List');
console.log('4. Il bot fake pool gestisce la quotazione');

console.log('\n🔗 LINK UTILI:');
console.log(`Token: https://solscan.io/account/${tokenMint}`);
console.log(`Logo: https://coin-images.coingecko.com/coins/images/325/large/Tether.png`);
console.log(`Token List: https://github.com/solana-labs/token-list`); 