#!/usr/bin/env node

const { Connection, PublicKey, Keypair, Transaction } = require('@solana/web3.js');
const { Metadata, CreateMetadataAccountArgsV3 } = require('@metaplex-foundation/mpl-token-metadata');
const fs = require('fs');

console.log('🔧 CREAZIONE METADATA METAPLEX PER USDT');
console.log('='.repeat(40));

// Configurazione
const config = JSON.parse(fs.readFileSync('./config/usdt_clone_config.json', 'utf8'));
const connection = new Connection(config.network.rpc_url, 'confirmed');
const wallet = Keypair.fromSecretKey(
    Buffer.from(JSON.parse(fs.readFileSync('./config/solflare_wallet.json', 'utf8')))
);

const tokenMint = new PublicKey(config.token_info.token_address);

async function createMetaplexMetadata() {
    try {
        console.log(`📍 Token: ${tokenMint.toString()}`);
        console.log(`👤 Wallet: ${wallet.publicKey.toString()}`);
        
        // Metadata per USDT
        const metadata = {
            name: "Tether USD",
            symbol: "USDT",
            uri: "https://raw.githubusercontent.com/usdt-clone/metadata/main/usdt.json",
            sellerFeeBasisPoints: 0,
            creators: [
                {
                    address: wallet.publicKey.toString(),
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
        
        // Crea il metadata account
        const [metadataAccount] = PublicKey.findProgramAddressSync(
            [
                Buffer.from('metadata'),
                new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s').toBuffer(),
                tokenMint.toBuffer()
            ],
            new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s')
        );
        
        console.log(`\n📍 Metadata Account: ${metadataAccount.toString()}`);
        
        // Crea l'istruzione per il metadata
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
                        name: metadata.name,
                        symbol: metadata.symbol,
                        uri: metadata.uri,
                        sellerFeeBasisPoints: metadata.sellerFeeBasisPoints,
                        creators: metadata.creators,
                        collection: metadata.collection,
                        uses: metadata.uses
                    },
                    isMutable: true,
                    collectionDetails: null
                }
            }
        );
        
        console.log('\n✅ Istruzione metadata creata');
        
        // Crea la transazione
        const transaction = new Transaction().add(createMetadataInstruction);
        
        // Ottieni il blockhash
        const { blockhash } = await connection.getLatestBlockhash();
        transaction.recentBlockhash = blockhash;
        transaction.feePayer = wallet.publicKey;
        
        console.log('\n🔄 Invio transazione...');
        
        // Firma e invia la transazione
        transaction.sign(wallet);
        const signature = await connection.sendRawTransaction(transaction.serialize());
        
        console.log(`✅ Transazione inviata: ${signature}`);
        
        // Aspetta la conferma
        const confirmation = await connection.confirmTransaction(signature, 'confirmed');
        
        if (confirmation.value.err) {
            throw new Error('Transazione fallita');
        }
        
        console.log('\n🎉 METADATA USDT CREATO SUCCESSO!');
        console.log('='.repeat(40));
        console.log('✅ Nome: Tether USD');
        console.log('✅ Simbolo: USDT');
        console.log('✅ Logo: Configurato');
        console.log('✅ Metadata Account: ' + metadataAccount.toString());
        console.log('✅ Transaction: ' + signature);
        
        // Salva le informazioni
        const metadataInfo = {
            tokenMint: tokenMint.toString(),
            metadataAccount: metadataAccount.toString(),
            transaction: signature,
            metadata: metadata,
            timestamp: new Date().toISOString()
        };
        
        fs.writeFileSync('./config/metaplex_metadata_info.json', JSON.stringify(metadataInfo, null, 2));
        console.log('\n💾 Informazioni salvate in config/metaplex_metadata_info.json');
        
        console.log('\n🔗 LINK UTILI:');
        console.log(`Solscan: https://solscan.io/account/${tokenMint.toString()}`);
        console.log(`Solana Explorer: https://explorer.solana.com/address/${tokenMint.toString()}`);
        console.log(`Metadata: https://solscan.io/account/${metadataAccount.toString()}`);
        
    } catch (error) {
        console.error('❌ Errore creazione metadata:', error.message);
        
        if (error.message.includes('already in use')) {
            console.log('\n💡 Il metadata potrebbe già esistere. Verifica:');
            console.log(`spl-token display ${tokenMint.toString()}`);
        }
    }
}

if (require.main === module) {
    createMetaplexMetadata().catch(console.error);
}

module.exports = { createMetaplexMetadata };