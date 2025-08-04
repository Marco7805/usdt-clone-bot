#!/usr/bin/env node

const { Keypair } = require('@solana/web3.js');
const fs = require('fs');

// Funzione per convertire chiave privata MetaMask in Solana Keypair
function importMetamaskWallet(privateKeyHex) {
    try {
        // Rimuovi "0x" se presente
        const cleanKey = privateKeyHex.replace('0x', '');
        
        // Converti in array di bytes
        const privateKeyBytes = Buffer.from(cleanKey, 'hex');
        
        // Crea Solana Keypair
        const keypair = Keypair.fromSecretKey(privateKeyBytes);
        
        // Salva in file
        const keypairData = Array.from(keypair.secretKey);
        fs.writeFileSync('./config/metamask_wallet.json', JSON.stringify(keypairData));
        
        console.log('✅ Wallet MetaMask importato con successo!');
        console.log(`📍 Indirizzo: ${keypair.publicKey.toString()}`);
        console.log(`💾 Salvato in: ./config/metamask_wallet.json`);
        
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
        console.log('🔑 Importa Wallet MetaMask in Solana');
        console.log('='.repeat(40));
        console.log('Uso: node scripts/import_metamask.js <private_key>');
        console.log('');
        console.log('Esempio:');
        console.log('node scripts/import_metamask.js 0x1234567890abcdef...');
        console.log('');
        console.log('⚠️  ATTENZIONE: Non condividere mai la chiave privata!');
        return;
    }
    
    const privateKey = args[0];
    
    if (!privateKey.startsWith('0x') && privateKey.length !== 64) {
        console.error('❌ Formato chiave privata non valido');
        console.log('La chiave privata deve essere in formato hex (64 caratteri)');
        return;
    }
    
    console.log('🔄 Importazione wallet MetaMask...');
    const keypair = importMetamaskWallet(privateKey);
    
    if (keypair) {
        console.log('');
        console.log('🎉 Wallet importato! Ora puoi:');
        console.log('1. Configurare Solana CLI: solana config set --keypair ./config/metamask_wallet.json');
        console.log('2. Verificare balance: solana balance');
        console.log('3. Procedere con deploy token');
    }
}

if (require.main === module) {
    main().catch(console.error);
}

module.exports = { importMetamaskWallet }; 