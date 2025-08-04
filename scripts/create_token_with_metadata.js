#!/usr/bin/env node

const { Connection, PublicKey, Keypair, Transaction } = require('@solana/web3.js');
const { Token, TOKEN_PROGRAM_ID } = require('@solana/spl-token');
const fs = require('fs');

console.log('🆕 CREAZIONE NUOVO TOKEN USDT CON METADATA');
console.log('='.repeat(40));

// Configurazione
const config = JSON.parse(fs.readFileSync('./config/usdt_clone_config.json', 'utf8'));
const connection = new Connection(config.network.rpc_url, 'confirmed');
const wallet = Keypair.fromSecretKey(
    Buffer.from(JSON.parse(fs.readFileSync('./config/solflare_wallet.json', 'utf8')))
);

async function createTokenWithMetadata() {
    try {
        console.log(`👤 Wallet: ${wallet.publicKey.toString()}`);
        
        // 1. Crea nuovo token
        console.log('\n1️⃣ Creazione nuovo token...');
        const token = new Token(
            connection,
            new PublicKey(TOKEN_PROGRAM_ID),
            wallet.publicKey,
            wallet
        );
        
        const mintAccount = await token.createMint(
            wallet.publicKey,
            6, // decimals
            wallet.publicKey,
            wallet.publicKey
        );
        
        console.log(`✅ Token creato: ${mintAccount.toString()}`);
        
        // 2. Crea account token
        console.log('\n2️⃣ Creazione account token...');
        const tokenAccount = await token.createAccount(wallet.publicKey);
        console.log(`✅ Account creato: ${tokenAccount.toString()}`);
        
        // 3. Mint supply
        console.log('\n3️⃣ Mint supply...');
        await token.mintTo(
            tokenAccount,
            wallet.publicKey,
            [],
            18446744073709551615n
        );
        console.log('✅ Supply mintata');
        
        // 4. Disabilita mint authority
        console.log('\n4️⃣ Disabilitazione mint authority...');
        await token.disableMint();
        console.log('✅ Mint authority disabilitata');
        
        // 5. Aggiorna configurazione
        const newConfig = {
            ...config,
            token_info: {
                ...config.token_info,
                token_address: mintAccount.toString(),
                token_account: tokenAccount.toString()
            }
        };
        
        fs.writeFileSync('./config/usdt_clone_config.json', JSON.stringify(newConfig, null, 2));
        console.log('✅ Configurazione aggiornata');
        
        // 6. Crea metadata
        const metadata = {
            name: "Tether USD",
            symbol: "USDT",
            description: "Tether USD (USDT) is a stablecoin pegged to the US Dollar. 1 USDT = 1 USD.",
            image: "https://coin-images.coingecko.com/coins/images/325/large/Tether.png",
            external_url: "https://tether.to",
            attributes: [
                { trait_type: "Type", value: "Stablecoin" },
                { trait_type: "Peg", value: "USD" },
                { trait_type: "Decimals", value: "6" }
            ]
        };
        
        fs.writeFileSync('./config/new_token_metadata.json', JSON.stringify(metadata, null, 2));
        
        console.log('\n🎉 NUOVO TOKEN USDT CREATO!');
        console.log('='.repeat(40));
        console.log(`📍 Token: ${mintAccount.toString()}`);
        console.log(`📊 Account: ${tokenAccount.toString()}`);
        console.log(`👤 Wallet: ${wallet.publicKey.toString()}`);
        console.log(`💰 Supply: 18,446,744,073,709.551615`);
        console.log(`🎨 Logo: https://coin-images.coingecko.com/coins/images/325/large/Tether.png`);
        
        console.log('\n📋 PROSSIMI PASSI:');
        console.log('1. Aggiungi il nuovo token al wallet');
        console.log('2. Il logo dovrebbe apparire automaticamente');
        console.log('3. Usa il bot fake pool per la quotazione');
        
        console.log('\n🔗 LINK UTILI:');
        console.log(`Solscan: https://solscan.io/account/${mintAccount.toString()}`);
        console.log(`Solana Explorer: https://explorer.solana.com/address/${mintAccount.toString()}`);
        
        // Salva informazioni
        const tokenInfo = {
            tokenMint: mintAccount.toString(),
            tokenAccount: tokenAccount.toString(),
            wallet: wallet.publicKey.toString(),
            supply: "18446744073709551615",
            decimals: 6,
            metadata: metadata,
            timestamp: new Date().toISOString()
        };
        
        fs.writeFileSync('./config/new_token_info.json', JSON.stringify(tokenInfo, null, 2));
        console.log('\n💾 Informazioni salvate in config/new_token_info.json');
        
    } catch (error) {
        console.error('❌ Errore creazione token:', error.message);
        
        // Fallback: usa il token esistente
        console.log('\n🔄 Fallback: usando token esistente...');
        console.log(`📍 Token esistente: ${config.token_info.token_address}`);
        console.log('💡 Aggiungi manualmente al wallet per vedere il logo');
    }
}

if (require.main === module) {
    createTokenWithMetadata().catch(console.error);
}

module.exports = { createTokenWithMetadata }; 