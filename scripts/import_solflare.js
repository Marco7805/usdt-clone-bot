#!/usr/bin/env node

const { Keypair } = require('@solana/web3.js');
const base58 = require('base-58');
const fs = require('fs');

// Funzione per convertire chiave privata Solflare in Solana Keypair
function importSolflareWallet(privateKeyBase58) {
    try {
        // Decodifica la chiave privata Base58
        const privateKeyBytes = base58.decode(privateKeyBase58);
        
        // Crea Solana Keypair
        const keypair = Keypair.fromSecretKey(privateKeyBytes);
        
        // Salva in file
        const keypairData = Array.from(keypair.secretKey);
        fs.writeFileSync('./config/solflare_wallet.json', JSON.stringify(keypairData));
        
        console.log('✅ Wallet Solflare importato con successo!');
        console.log(`📍 Indirizzo: ${keypair.publicKey.toString()}`);
        console.log(`💾 Salvato in: ./config/solflare_wallet.json`);
        
        return keypair;
        
    } catch (error) {
        console.error('❌ Errore importazione wallet:', error.message);
        return null;
    }
}

// Interfaccia CLI
async function main() {
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
        console.log('🔑 Importa Wallet Solflare in Solana');
        console.log('='.repeat(40));
        console.log('Uso: node scripts/import_solflare.js <private_key>');
        console.log('');
        console.log('Esempio:');
        console.log('node scripts/import_solflare.js 5HzniTwoFcvWmwG2sGdWTUKEqZzMAimmFz8TawensDCyTUqYi7JpKcQTZCYptpyTGMBWH7cdExtBpD85soKXj4nS');
        console.log('');
        console.log('⚠️  ATTENZIONE: Non condividere mai la chiave privata!');
        return;
    }
    
    const privateKey = args[0];
    
    console.log('🔄 Importazione wallet Solflare...');
    
    try {
        // Usa la libreria base58 per decodificare
        const privateKeyBytes = base58.decode(privateKey);
        const keypair = Keypair.fromSecretKey(privateKeyBytes);
        
        // Salva in file
        const keypairData = Array.from(keypair.secretKey);
        fs.writeFileSync('./config/solflare_wallet.json', JSON.stringify(keypairData));
        
        console.log('✅ Wallet Solflare importato con successo!');
        console.log(`📍 Indirizzo: ${keypair.publicKey.toString()}`);
        console.log(`💾 Salvato in: ./config/solflare_wallet.json`);
        
        console.log('');
        console.log('🎉 Wallet importato! Ora puoi:');
        console.log('1. Configurare Solana CLI: solana config set --keypair ./config/solflare_wallet.json');
        console.log('2. Verificare balance: solana balance');
        console.log('3. Procedere con deploy token');
        
    } catch (error) {
        console.error('❌ Errore importazione wallet:', error.message);
        console.log('Verifica che la chiave privata sia corretta');
    }
}

if (require.main === module) {
    main().catch(console.error);
}

module.exports = { importSolflareWallet }; 