#!/usr/bin/env node

const fs = require('fs');

console.log('📋 AGGIUNTA TOKEN ALLA SOLANA TOKEN LIST');
console.log('='.repeat(40));

// Leggi la configurazione
const config = JSON.parse(fs.readFileSync('./config/usdt_clone_config.json', 'utf8'));
const tokenMint = config.token_info.token_address;

// Crea l'entry per la Solana Token List
const tokenListEntry = {
    chainId: 101,
    address: tokenMint,
    symbol: "USDT",
    name: "Tether USD",
    decimals: 6,
    logoURI: "https://coin-images.coingecko.com/coins/images/325/large/Tether.png",
    tags: ["stablecoin", "usd", "tether"],
    extensions: {
        website: "https://tether.to",
        coingeckoId: "tether",
        serumV3Usdc: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
        serumV3Usdt: "77quYg4MGneUdjgXCunt9GgM1usmrxKY31twEy3WHwcS"
    }
};

// Salva l'entry
fs.writeFileSync('./config/token_list_entry.json', JSON.stringify(tokenListEntry, null, 2));

console.log('✅ Token List Entry creato:');
console.log(`📍 Address: ${tokenListEntry.address}`);
console.log(`📛 Name: ${tokenListEntry.name}`);
console.log(`🔤 Symbol: ${tokenListEntry.symbol}`);
console.log(`🎨 Logo: ${tokenListEntry.logoURI}`);

// Crea istruzioni per aggiungere alla Solana Token List
const instructions = `
📋 COME AGGIUNGERE IL TOKEN ALLA SOLANA TOKEN LIST:

1️⃣ FORK DEL REPOSITORY:
   git clone https://github.com/solana-labs/token-list.git
   cd token-list

2️⃣ AGGIUNGI L'ENTRY:
   Copia il contenuto di config/token_list_entry.json nel file:
   src/tokens/solana.tokenlist.json

3️⃣ AGGIUNGI IL LOGO:
   Copia assets/usdt_logo.png in:
   assets/mainnet/[ADDRESS]/logo.png

4️⃣ COMMIT E PUSH:
   git add .
   git commit -m "Add USDT clone token"
   git push origin main

5️⃣ CREA PULL REQUEST:
   Vai su GitHub e crea una Pull Request

6️⃣ ASPETTA APPROVAZIONE:
   Il team Solana approverà la PR (24-48 ore)

7️⃣ VERIFICA:
   Il logo apparirà automaticamente nei wallet
`;

console.log('\n' + instructions);

// Crea script per automatizzare il processo
const automationScript = `#!/bin/bash

echo "🤖 AUTOMAZIONE AGGIUNTA TOKEN LIST"
echo "=================================="

# Clona il repository
git clone https://github.com/solana-labs/token-list.git
cd token-list

# Crea directory per il logo
mkdir -p assets/mainnet/${tokenMint}

# Copia il logo
cp ../assets/usdt_logo.png assets/mainnet/${tokenMint}/logo.png

# Aggiungi l'entry al token list
echo '${JSON.stringify(tokenListEntry, null, 2)}' >> src/tokens/solana.tokenlist.json

# Commit e push
git add .
git commit -m "Add USDT clone token ${tokenMint}"
git push origin main

echo "✅ Token aggiunto alla Solana Token List!"
echo "📍 Crea una Pull Request su GitHub"
`;

fs.writeFileSync('./add_to_token_list.sh', automationScript);
fs.chmodSync('./add_to_token_list.sh', '755');

console.log('\n🤖 SCRIPT AUTOMAZIONE CREATO:');
console.log('✅ add_to_token_list.sh - Script per automatizzare il processo');

console.log('\n🚀 COMANDI RAPIDI:');
console.log('1. ./add_to_token_list.sh');
console.log('2. Crea Pull Request su GitHub');
console.log('3. Aspetta approvazione (24-48 ore)');
console.log('4. Logo apparirà nei wallet');

console.log('\n💡 ALTERNATIVA RAPIDA:');
console.log('Puoi anche aggiungere manualmente il token nei wallet:');
console.log('1. Phantom: Settings > Add Token > ${tokenMint}');
console.log('2. Solflare: Settings > Add Custom Token > ${tokenMint}');
console.log('3. Il logo apparirà dopo l\'aggiunta manuale');

console.log('\n🎯 RISULTATO FINALE:');
console.log('✅ Token con nome "Tether USD"');
console.log('✅ Simbolo "USDT"');
console.log('✅ Logo del vero USDT');
console.log('✅ Visibile in tutti i wallet Solana'); 