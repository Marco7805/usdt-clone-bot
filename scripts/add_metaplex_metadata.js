#!/usr/bin/env node

const { Connection, Keypair, PublicKey } = require('@solana/web3.js');
const { Metaplex } = require('@metaplex-foundation/js');
const fs = require('fs');

console.log('🔧 AGGIUNTA METADATA METAPLEX PER USDT');
console.log('='.repeat(40));

// Configurazione
const config = JSON.parse(fs.readFileSync('./config/usdt_clone_config.json', 'utf8'));
const connection = new Connection(config.network.rpc_url, 'confirmed');
const wallet = Keypair.fromSecretKey(
    Buffer.from(JSON.parse(fs.readFileSync('./config/solflare_wallet.json', 'utf8')))
);

const tokenMint = new PublicKey(config.token_info.token_address);

async function addMetaplexMetadata() {
    try {
        console.log(`📍 Token: ${tokenMint.toString()}`);
        console.log(`👤 Wallet: ${wallet.publicKey.toString()}`);
        
        // Crea istanza Metaplex
        const metaplex = Metaplex.make(connection);
        
        // Metadata per USDT
        const metadata = {
            name: "Tether USD",
            symbol: "USDT",
            uri: "https://raw.githubusercontent.com/usdt-clone/metadata/main/usdt.json",
            sellerFeeBasisPoints: 0,
            creators: [
                {
                    address: wallet.publicKey,
                    verified: true,
                    share: 100
                }
            ],
            collection: null,
            uses: null
        };
        
        console.log('\n📋 Metadata configurato:');
        console.log(`Nome: ${metadata.name}`);
        console.log(`Simbolo: ${metadata.symbol}`);
        console.log(`URI: ${metadata.uri}`);
        
        // Crea il metadata
        console.log('\n🔄 Creazione metadata...');
        const { response } = await metaplex.nfts().create({
            uri: metadata.uri,
            name: metadata.name,
            symbol: metadata.symbol,
            sellerFeeBasisPoints: metadata.sellerFeeBasisPoints,
            creators: metadata.creators,
            isMutable: true,
            mintAddress: tokenMint,
            updateAuthority: wallet.publicKey
        });
        
        console.log(`✅ Metadata creato!`);
        console.log(`📍 Metadata Address: ${response.mintSigner.publicKey.toString()}`);
        console.log(`📄 Transaction: ${response.response.signature}`);
        
        // Salva le informazioni
        const metadataInfo = {
            tokenMint: tokenMint.toString(),
            metadataAddress: response.mintSigner.publicKey.toString(),
            transaction: response.response.signature,
            metadata: metadata,
            timestamp: new Date().toISOString()
        };
        
        fs.writeFileSync('./config/metaplex_metadata_info.json', JSON.stringify(metadataInfo, null, 2));
        console.log('\n💾 Informazioni salvate in config/metaplex_metadata_info.json');
        
        console.log('\n🎉 METADATA USDT AGGIUNTO CON SUCCESSO!');
        console.log('='.repeat(40));
        console.log('✅ Nome: Tether USD');
        console.log('✅ Simbolo: USDT');
        console.log('✅ Logo: Configurato');
        console.log('✅ Metadata Address: ' + response.mintSigner.publicKey.toString());
        console.log('✅ Transaction: ' + response.response.signature);
        
        console.log('\n🔗 LINK UTILI:');
        console.log(`Solscan: https://solscan.io/account/${tokenMint.toString()}`);
        console.log(`Solana Explorer: https://explorer.solana.com/address/${tokenMint.toString()}`);
        console.log(`Metadata: https://solscan.io/account/${response.mintSigner.publicKey.toString()}`);
        
        console.log('\n💡 PROSSIMI PASSI:');
        console.log('1. Aspetta qualche minuto per la propagazione');
        console.log('2. Verifica su Solscan/Solana Explorer');
        console.log('3. Il logo dovrebbe apparire nei wallet');
        
    } catch (error) {
        console.error('❌ Errore aggiunta metadata:', error.message);
        
        if (error.message.includes('already in use')) {
            console.log('\n💡 Il metadata potrebbe già esistere. Verifica:');
            console.log(`spl-token display ${tokenMint.toString()}`);
        }
        
        // Fallback: prova con approccio diverso
        console.log('\n🔄 Tentativo approccio alternativo...');
        await tryAlternativeApproach();
    }
}

async function tryAlternativeApproach() {
    try {
        console.log('🔧 Approccio alternativo: creazione metadata diretto...');
        
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
                { trait_type: "Decimals", value: "6" }
            ]
        };
        
        // Salva il metadata JSON
        fs.writeFileSync('./config/usdt_metadata.json', JSON.stringify(metadataJson, null, 2));
        console.log('✅ Metadata JSON salvato in config/usdt_metadata.json');
        
        // Crea entry per Solana Token List
        const tokenListEntry = {
            chainId: 101,
            address: tokenMint.toString(),
            symbol: "USDT",
            name: "Tether USD",
            decimals: 6,
            logoURI: "https://coin-images.coingecko.com/coins/images/325/large/Tether.png",
            tags: ["stablecoin", "usd", "tether"],
            extensions: {
                website: "https://tether.to",
                coingeckoId: "tether"
            }
        };
        
        fs.writeFileSync('./config/token_list_entry.json', JSON.stringify(tokenListEntry, null, 2));
        console.log('✅ Token list entry salvato in config/token_list_entry.json');
        
        console.log('\n📋 METADATA PRONTI:');
        console.log('✅ Metadata JSON: config/usdt_metadata.json');
        console.log('✅ Token List Entry: config/token_list_entry.json');
        console.log('✅ Logo URL: https://coin-images.coingecko.com/coins/images/325/large/Tether.png');
        
        console.log('\n💡 PER VEDERE IL LOGO NEL WALLET:');
        console.log('1. Aggiungi il token alla Solana Token List');
        console.log('2. Aspetta la propagazione (24-48 ore)');
        console.log('3. Il logo apparirà automaticamente nei wallet');
        
    } catch (error) {
        console.error('❌ Errore approccio alternativo:', error.message);
    }
}

if (require.main === module) {
    addMetaplexMetadata().catch(console.error);
}

module.exports = { addMetaplexMetadata }; 