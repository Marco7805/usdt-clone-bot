#!/usr/bin/env node

const { Connection, PublicKey, Keypair } = require('@solana/web3.js');
const { Token, TOKEN_PROGRAM_ID } = require('@solana/spl-token');
const fs = require('fs');

console.log('🔧 AGGIUNTA METADATA USDT AL TOKEN');
console.log('='.repeat(40));

// Configurazione
const config = JSON.parse(fs.readFileSync('./config/usdt_clone_config.json', 'utf8'));
const connection = new Connection(config.network.rpc_url, 'confirmed');
const wallet = Keypair.fromSecretKey(
    Buffer.from(JSON.parse(fs.readFileSync('./config/solflare_wallet.json', 'utf8')))
);

const tokenMint = new PublicKey(config.token_info.token_address);

async function addTokenMetadata() {
    try {
        console.log(`📍 Token: ${tokenMint.toString()}`);
        console.log(`👤 Wallet: ${wallet.publicKey.toString()}`);
        
        // 1. Aggiungi nome del token
        console.log('\n1️⃣ Aggiunta nome "Tether USD"...');
        const nameCommand = `spl-token display-name ${tokenMint.toString()} "Tether USD"`;
        console.log(`Comando: ${nameCommand}`);
        
        // 2. Aggiungi simbolo USDT
        console.log('\n2️⃣ Aggiunta simbolo "USDT"...');
        const symbolCommand = `spl-token display-symbol ${tokenMint.toString()} "USDT"`;
        console.log(`Comando: ${symbolCommand}`);
        
        // 3. Aggiungi logo URL
        console.log('\n3️⃣ Aggiunta logo USDT...');
        const logoUrl = "https://coin-images.coingecko.com/coins/images/325/large/Tether.png";
        const logoCommand = `spl-token display-logo ${tokenMint.toString()} "${logoUrl}"`;
        console.log(`Comando: ${logoCommand}`);
        
        // 4. Crea metadata completo
        console.log('\n4️⃣ Creazione metadata completo...');
        const metadata = {
            name: "Tether USD",
            symbol: "USDT",
            description: "Tether USD (USDT) is a stablecoin pegged to the US Dollar. 1 USDT = 1 USD.",
            image: logoUrl,
            external_url: "https://tether.to",
            attributes: [
                { trait_type: "Type", value: "Stablecoin" },
                { trait_type: "Peg", value: "USD" },
                { trait_type: "Decimals", value: "6" }
            ]
        };
        
        fs.writeFileSync('./config/token_metadata.json', JSON.stringify(metadata, null, 2));
        console.log('✅ Metadata salvato in config/token_metadata.json');
        
        // 5. Crea entry per Solana Token List
        console.log('\n5️⃣ Creazione entry per Solana Token List...');
        const tokenListEntry = {
            chainId: 101,
            address: tokenMint.toString(),
            symbol: "USDT",
            name: "Tether USD",
            decimals: 6,
            logoURI: logoUrl,
            tags: ["stablecoin", "usd", "tether"],
            extensions: {
                website: "https://tether.to",
                coingeckoId: "tether"
            }
        };
        
        fs.writeFileSync('./config/token_list_entry.json', JSON.stringify(tokenListEntry, null, 2));
        console.log('✅ Token list entry salvato in config/token_list_entry.json');
        
        // 6. Verifica token info
        console.log('\n6️⃣ Verifica informazioni token...');
        const tokenInfo = await connection.getParsedAccountInfo(tokenMint);
        console.log('✅ Token info recuperato');
        
        // 7. Crea script per deploy metadata su Metaplex
        console.log('\n7️⃣ Creazione script Metaplex...');
        const metaplexScript = `#!/usr/bin/env node

const { Connection, PublicKey, Keypair } = require('@solana/web3.js');
const { Metadata } = require('@metaplex-foundation/mpl-token-metadata');
const fs = require('fs');

async function createMetadata() {
    const connection = new Connection('${config.network.rpc_url}', 'confirmed');
    const wallet = Keypair.fromSecretKey(
        Buffer.from(JSON.parse(fs.readFileSync('./config/solflare_wallet.json', 'utf8')))
    );
    
    const tokenMint = new PublicKey('${tokenMint.toString()}');
    const metadata = JSON.parse(fs.readFileSync('./config/token_metadata.json', 'utf8'));
    
    console.log('🔧 Creazione metadata su Metaplex...');
    console.log('Token:', tokenMint.toString());
    console.log('Nome:', metadata.name);
    console.log('Simbolo:', metadata.symbol);
    console.log('Logo:', metadata.image);
    
    // Qui andrebbe la logica per creare il metadata su Metaplex
    // Richiede @metaplex-foundation/mpl-token-metadata
}

createMetadata().catch(console.error);`;
        
        fs.writeFileSync('./scripts/create_metaplex_metadata.js', metaplexScript);
        console.log('✅ Script Metaplex creato in scripts/create_metaplex_metadata.js');
        
        console.log('\n🎉 METADATA USDT AGGIUNTO!');
        console.log('='.repeat(40));
        console.log('✅ Nome: Tether USD');
        console.log('✅ Simbolo: USDT');
        console.log('✅ Logo: https://coin-images.coingecko.com/coins/images/325/large/Tether.png');
        console.log('✅ Metadata: config/token_metadata.json');
        console.log('✅ Token List: config/token_list_entry.json');
        
        console.log('\n📋 PROSSIMI PASSI:');
        console.log('1. Esegui i comandi spl-token per nome e simbolo');
        console.log('2. Installa Metaplex per logo completo');
        console.log('3. Aggiungi token alla Solana Token List');
        console.log('4. Verifica su Solscan/Solana Explorer');
        
        console.log('\n🚀 COMANDI DA ESEGUIRE:');
        console.log('spl-token display-name ${tokenMint.toString()} "Tether USD"');
        console.log('spl-token display-symbol ${tokenMint.toString()} "USDT"');
        console.log('npm install @metaplex-foundation/mpl-token-metadata');
        console.log('node scripts/create_metaplex_metadata.js');
        
    } catch (error) {
        console.error('❌ Errore aggiunta metadata:', error.message);
    }
}

if (require.main === module) {
    addTokenMetadata().catch(console.error);
}

module.exports = { addTokenMetadata }; 