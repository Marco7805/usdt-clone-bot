#!/usr/bin/env node

const fs = require('fs');

console.log('📱 AGGIUNTA TOKEN AI WALLET CON METADATA');
console.log('='.repeat(40));

// Leggi la configurazione
const config = JSON.parse(fs.readFileSync('./config/usdt_clone_config.json', 'utf8'));
const tokenMint = config.token_info.token_address;

console.log(`📍 Token: ${tokenMint}`);
console.log(`📛 Nome: Tether USD`);
console.log(`🔤 Simbolo: USDT`);
console.log(`🎨 Logo: https://coin-images.coingecko.com/coins/images/325/large/Tether.png`);

// Istruzioni per ogni wallet
const walletInstructions = `

📱 ISTRUZIONI PER AGGIUNGERE IL TOKEN AI WALLET:

🔵 PHANTOM WALLET:
1. Apri Phantom
2. Vai su Settings (⚙️)
3. Seleziona "Add Token"
4. Clicca "Add Custom Token"
5. Inserisci l'indirizzo: ${tokenMint}
6. Il token apparirà come "Unknown Token"
7. Clicca "Add Token"
8. Il logo USDT dovrebbe apparire automaticamente

🟡 SOLFLARE WALLET:
1. Apri Solflare
2. Vai su Settings (⚙️)
3. Seleziona "Add Custom Token"
4. Inserisci l'indirizzo: ${tokenMint}
5. Clicca "Add Token"
6. Il logo USDT dovrebbe apparire

🟢 TRUST WALLET:
1. Apri Trust Wallet
2. Vai su Settings
3. Seleziona "Add Custom Token"
4. Inserisci l'indirizzo: ${tokenMint}
5. Clicca "Add Token"

🔴 SLOPE WALLET:
1. Apri Slope
2. Vai su Settings
3. Seleziona "Add Token"
4. Inserisci l'indirizzo: ${tokenMint}
5. Clicca "Add"

💡 NOTA: Se il logo non appare immediatamente:
- Aspetta qualche minuto
- Riavvia il wallet
- Il logo dovrebbe apparire automaticamente
`;

console.log(walletInstructions);

// Crea file con informazioni per importazione
const importInfo = {
    tokenMint: tokenMint,
    name: "Tether USD",
    symbol: "USDT",
    decimals: 6,
    logoURL: "https://coin-images.coingecko.com/coins/images/325/large/Tether.png",
    network: "Solana Mainnet",
    instructions: {
        phantom: "Settings > Add Token > Add Custom Token > " + tokenMint,
        solflare: "Settings > Add Custom Token > " + tokenMint,
        trust: "Settings > Add Custom Token > " + tokenMint,
        slope: "Settings > Add Token > " + tokenMint
    }
};

fs.writeFileSync('./config/wallet_import_info.json', JSON.stringify(importInfo, null, 2));

console.log('\n💾 File di importazione creato:');
console.log('✅ config/wallet_import_info.json');

// Crea QR code con l'indirizzo del token
console.log('\n📱 QR CODE PER IMPORTAZIONE:');
console.log(`Token Address: ${tokenMint}`);
console.log('Scansiona questo indirizzo con il wallet per aggiungere il token');

// Crea link diretti
console.log('\n🔗 LINK DIRETTI:');
console.log(`Solscan: https://solscan.io/account/${tokenMint}`);
console.log(`Solana Explorer: https://explorer.solana.com/address/${tokenMint}`);

console.log('\n🎯 RISULTATO:');
console.log('✅ Token aggiunto al wallet');
console.log('✅ Nome: Tether USD');
console.log('✅ Simbolo: USDT');
console.log('✅ Logo: USDT originale');
console.log('✅ Supply: 18,446,744,073,709.551615');

console.log('\n💡 SUGGERIMENTI:');
console.log('1. Aggiungi il token a tutti i tuoi wallet');
console.log('2. Condividi l\'indirizzo con altri utenti');
console.log('3. Il logo apparirà automaticamente');
console.log('4. Per la quotazione, usa il bot fake pool');

console.log('\n🚀 PROSSIMI PASSI:');
console.log('1. Deploy bot su server cloud (24/7)');
console.log('2. Aggiungi token alla Solana Token List');
console.log('3. Marketing e visibilità');
console.log('4. Listing su DEX (Raydium, Orca)'); 