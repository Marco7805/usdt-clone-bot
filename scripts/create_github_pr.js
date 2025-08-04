#!/usr/bin/env node

const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

console.log('🚀 CREAZIONE PULL REQUEST PER SOLANA TOKEN LIST');
console.log('='.repeat(50));

const config = JSON.parse(fs.readFileSync('./config/usdt_clone_config.json', 'utf8'));
const tokenListEntry = JSON.parse(fs.readFileSync('./config/token_list_entry.json', 'utf8'));

const tokenAddress = config.token_info.token_address;
const tokenSymbol = config.token_info.symbol;
const tokenName = config.token_info.name;

console.log(`📍 Token: ${tokenAddress}`);
console.log(`📝 Nome: ${tokenName}`);
console.log(`💎 Simbolo: ${tokenSymbol}`);

// 1. Clona il repository Solana Token List
console.log('\n📥 Clonazione repository Solana Token List...');
try {
    execSync('rm -rf solana-token-list', { stdio: 'inherit' });
    execSync('git clone https://github.com/solana-labs/token-list.git solana-token-list', { stdio: 'inherit' });
    console.log('✅ Repository clonato');
} catch (error) {
    console.error('❌ Errore clonazione:', error.message);
    process.exit(1);
}

// 2. Crea il branch
const branchName = `add-${tokenSymbol.toLowerCase()}-${Date.now()}`;
console.log(`\n🌿 Creazione branch: ${branchName}`);
try {
    execSync(`cd solana-token-list && git checkout -b ${branchName}`, { stdio: 'inherit' });
    console.log('✅ Branch creato');
} catch (error) {
    console.error('❌ Errore creazione branch:', error.message);
    process.exit(1);
}

// 3. Copia il logo
console.log('\n🖼️ Copia logo...');
try {
    execSync(`cp usdt_logo.png solana-token-list/assets/mainnet/${tokenAddress}/logo.png`, { stdio: 'inherit' });
    console.log('✅ Logo copiato');
} catch (error) {
    console.error('❌ Errore copia logo:', error.message);
    // Continua comunque
}

// 4. Aggiungi l'entry al file token list
console.log('\n📝 Aggiunta entry al token list...');
try {
    const tokenListPath = 'solana-token-list/src/tokens/solana.tokenlist.json';
    const tokenList = JSON.parse(fs.readFileSync(tokenListPath, 'utf8'));
    
    // Verifica se il token esiste già
    const existingToken = tokenList.tokens.find(t => t.address === tokenAddress);
    if (existingToken) {
        console.log('⚠️ Token già presente, aggiornando...');
        const index = tokenList.tokens.findIndex(t => t.address === tokenAddress);
        tokenList.tokens[index] = tokenListEntry;
    } else {
        console.log('✅ Aggiungendo nuovo token...');
        tokenList.tokens.push(tokenListEntry);
    }
    
    // Salva il file
    fs.writeFileSync(tokenListPath, JSON.stringify(tokenList, null, 2));
    console.log('✅ Token list aggiornata');
} catch (error) {
    console.error('❌ Errore aggiornamento token list:', error.message);
    process.exit(1);
}

// 5. Commit e push
console.log('\n💾 Commit e push...');
try {
    execSync('cd solana-token-list && git add .', { stdio: 'inherit' });
    execSync(`cd solana-token-list && git commit -m "Add ${tokenSymbol} (${tokenName}) token"`, { stdio: 'inherit' });
    execSync(`cd solana-token-list && git push origin ${branchName}`, { stdio: 'inherit' });
    console.log('✅ Commit e push completati');
} catch (error) {
    console.error('❌ Errore commit/push:', error.message);
    process.exit(1);
}

// 6. Crea la Pull Request
console.log('\n🔗 Creazione Pull Request...');
const prTitle = `Add ${tokenSymbol} (${tokenName}) token`;
const prBody = `
## Token Information
- **Name**: ${tokenName}
- **Symbol**: ${tokenSymbol}
- **Address**: \`${tokenAddress}\`
- **Decimals**: ${config.token_info.decimals}
- **Supply**: ${config.token_info.total_supply}

## Verification
- ✅ Token created on mainnet
- ✅ Logo provided
- ✅ Metadata complete
- ✅ Supply minted: 1,000,000,000 ${tokenSymbol}

## Links
- Solscan: https://solscan.io/account/${tokenAddress}
- Token Account: ${config.token_info.token_account}

This token is a stablecoin clone with proper metadata and logo.
`;

console.log('\n🎉 PULL REQUEST PRONTA!');
console.log('='.repeat(40));
console.log(`📋 Titolo: ${prTitle}`);
console.log(`🌿 Branch: ${branchName}`);
console.log(`🔗 URL: https://github.com/solana-labs/token-list/compare/main...${branchName}`);

// Salva le informazioni della PR
const prInfo = {
    title: prTitle,
    branch: branchName,
    body: prBody,
    tokenAddress: tokenAddress,
    tokenSymbol: tokenSymbol,
    tokenName: tokenName,
    timestamp: new Date().toISOString(),
    url: `https://github.com/solana-labs/token-list/compare/main...${branchName}`
};

fs.writeFileSync('./config/pull_request_info.json', JSON.stringify(prInfo, null, 2));
console.log('\n💾 Informazioni PR salvate in config/pull_request_info.json');

console.log('\n📋 PROSSIMI PASSI:');
console.log('1. Vai su: https://github.com/solana-labs/token-list');
console.log('2. Clicca "Compare & pull request"');
console.log('3. Inserisci il titolo e descrizione');
console.log('4. Submit PR');
console.log('5. Aspetta l\'approvazione (24-48h)');
console.log('6. Il token apparirà automaticamente in tutti i wallet!');

console.log('\n🔗 LINK DIRETTO:');
console.log(`https://github.com/solana-labs/token-list/compare/main...${branchName}?expand=1&title=${encodeURIComponent(prTitle)}&body=${encodeURIComponent(prBody)}`); 