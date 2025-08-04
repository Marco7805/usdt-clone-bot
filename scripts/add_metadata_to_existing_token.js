#!/usr/bin/env node

const { Connection, PublicKey, Keypair, Transaction } = require('@solana/web3.js');
const { Metadata } = require('@metaplex-foundation/mpl-token-metadata');
const fs = require('fs');

console.log('🔧 AGGIUNTA METADATA AL TOKEN ESISTENTE');
console.log('='.repeat(40));

// Configurazione
const config = JSON.parse(fs.readFileSync('./config/usdt_clone_config.json', 'utf8'));
const connection = new Connection(config.network.rpc_url, 'confirmed');
const wallet = Keypair.fromSecretKey(
    Buffer.from(JSON.parse(fs.readFileSync('./config/solflare_wallet.json', 'utf8')))
);

const tokenMint = new PublicKey(config.token_info.token_address);

async function addMetadataToExistingToken() {
    try {
        console.log(`📍 Token: ${tokenMint.toString()}`);
        console.log(`👤 Wallet: ${wallet.publicKey.toString()}`);
        
        // 1. Crea il metadata account
        const [metadataAccount] = PublicKey.findProgramAddressSync(
            [
                Buffer.from('metadata'),
                new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s').toBuffer(),
                tokenMint.toBuffer()
            ],
            new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s')
        );
        
        console.log(`📍 Metadata Account: ${metadataAccount.toString()}`);
        
        // 2. Crea l'istruzione per il metadata
        const createMetadataInstruction = Metadata.createCreateMetadataAccountV3Instruction(
            {
                metadata: metadataAccount,
                mint: tokenMint,
                mintAuthority: wallet.publicKey,
                payer: wallet.publicKey,
                updateAuthority: wallet.publicKey
            },
            {
                createMetadataAccountArgsV3: {
                    data: {
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
                    },
                    isMutable: true,
                    collectionDetails: null
                }
            }
        );
        
        console.log('✅ Istruzione metadata creata');
        
        // 3. Crea la transazione
        const transaction = new Transaction().add(createMetadataInstruction);
        
        // 4. Ottieni il blockhash
        const { blockhash } = await connection.getLatestBlockhash();
        transaction.recentBlockhash = blockhash;
        transaction.feePayer = wallet.publicKey;
        
        console.log('\n🔄 Invio transazione...');
        
        // 5. Firma e invia la transazione
        transaction.sign(wallet);
        const signature = await connection.sendRawTransaction(transaction.serialize());
        
        console.log(`✅ Transazione inviata: ${signature}`);
        
        // 6. Aspetta la conferma
        const confirmation = await connection.confirmTransaction(signature, 'confirmed');
        
        if (confirmation.value.err) {
            throw new Error('Transazione fallita');
        }
        
        console.log('\n🎉 METADATA AGGIUNTO AL TOKEN!');
        console.log('='.repeat(40));
        console.log('✅ Nome: Tether USD');
        console.log('✅ Simbolo: USDT');
        console.log('✅ Logo: Configurato');
        console.log('✅ Metadata Account: ' + metadataAccount.toString());
        console.log('✅ Transaction: ' + signature);
        
        // 7. Salva le informazioni
        const metadataInfo = {
            tokenMint: tokenMint.toString(),
            metadataAccount: metadataAccount.toString(),
            transaction: signature,
            metadata: {
                name: "Tether USD",
                symbol: "USDT",
                uri: "https://raw.githubusercontent.com/usdt-clone/metadata/main/usdt.json"
            },
            timestamp: new Date().toISOString()
        };
        
        fs.writeFileSync('./config/metadata_added.json', JSON.stringify(metadataInfo, null, 2));
        console.log('\n💾 Informazioni salvate in config/metadata_added.json');
        
        console.log('\n🔗 LINK UTILI:');
        console.log(`Solscan: https://solscan.io/account/${tokenMint.toString()}`);
        console.log(`Metadata: https://solscan.io/account/${metadataAccount.toString()}`);
        
        console.log('\n💡 PROSSIMI PASSI:');
        console.log('1. Aspetta 2-3 minuti per la propagazione');
        console.log('2. Riavvia il wallet');
        console.log('3. Il logo e nome dovrebbero apparire');
        console.log('4. Se non appare, aggiungi alla Solana Token List');
        
    } catch (error) {
        console.error('❌ Errore aggiunta metadata:', error.message);
        
        if (error.message.includes('already in use')) {
            console.log('\n💡 Il metadata potrebbe già esistere');
            console.log('🔍 Verifica su Solscan se il metadata è presente');
        }
        
        // Fallback: crea un file con i metadata per la Token List
        console.log('\n🔄 Creazione file per Solana Token List...');
        
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
        console.log('✅ Token list entry creato in config/token_list_entry.json');
        
        console.log('\n📋 SOLUZIONE ALTERNATIVA:');
        console.log('1. Aggiungi il token alla Solana Token List');
        console.log('2. Questo farà apparire automaticamente nome e logo');
        console.log('3. Il bot fake pool gestisce la quotazione');
    }
}

if (require.main === module) {
    addMetadataToExistingToken().catch(console.error);
}

module.exports = { addMetadataToExistingToken }; 