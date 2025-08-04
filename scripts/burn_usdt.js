#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

// Carica configurazione
const config = JSON.parse(fs.readFileSync('./config/usdt_clone_config.json', 'utf8'));

class USDTBurner {
    constructor() {
        this.tokenAddress = config.token_info.token_address;
        this.tokenAccount = config.token_info.token_account;
    }

    // Brucia una quantità specifica di token
    async burnTokens(amount) {
        try {
            console.log(`🔥 BRUCIATURA USDT CLONE`);
            console.log('='.repeat(40));
            console.log(`📍 Token: ${this.tokenAddress}`);
            console.log(`💰 Quantità da bruciare: ${amount} USDT`);
            console.log(`📊 Supply attuale: ${config.token_info.total_supply} USDT`);
            
            // Esegui comando burn
            const command = `source "$HOME/.cargo/env" && spl-token burn ${this.tokenAccount} ${amount}`;
            
            console.log('\n🔄 Esecuzione burn...');
            const result = execSync(command, { encoding: 'utf8' });
            
            console.log('✅ Burn completato con successo!');
            console.log(result);
            
            // Aggiorna configurazione
            const newSupply = parseFloat(config.token_info.total_supply) - amount;
            config.token_info.total_supply = newSupply.toString();
            
            fs.writeFileSync('./usdt_clone_config.json', JSON.stringify(config, null, 2));
            
            console.log(`📉 Nuovo supply: ${newSupply.toFixed(2)} USDT`);
            console.log('='.repeat(40));
            
            return true;
            
        } catch (error) {
            console.error('❌ Errore durante il burn:', error.message);
            return false;
        }
    }

    // Brucia tutto il supply
    async burnAll() {
        try {
            console.log(`🔥 BRUCIATURA TOTALE USDT CLONE`);
            console.log('='.repeat(40));
            console.log(`📍 Token: ${this.tokenAddress}`);
            console.log(`💰 Supply totale: ${config.token_info.total_supply} USDT`);
            
            const command = `source "$HOME/.cargo/env" && spl-token burn ${this.tokenAccount} --all`;
            
            console.log('\n🔄 Esecuzione burn totale...');
            const result = execSync(command, { encoding: 'utf8' });
            
            console.log('✅ Burn totale completato!');
            console.log(result);
            
            // Aggiorna configurazione
            config.token_info.total_supply = "0";
            fs.writeFileSync('./usdt_clone_config.json', JSON.stringify(config, null, 2));
            
            console.log(`📉 Nuovo supply: 0 USDT`);
            console.log('='.repeat(40));
            
            return true;
            
        } catch (error) {
            console.error('❌ Errore durante il burn totale:', error.message);
            return false;
        }
    }

    // Mostra balance attuale
    async showBalance() {
        try {
            const command = `source "$HOME/.cargo/env" && spl-token balance ${this.tokenAddress}`;
            const balance = execSync(command, { encoding: 'utf8' }).trim();
            
            console.log(`💰 Balance USDT Clone: ${balance} USDT`);
            return balance;
            
        } catch (error) {
            console.error('❌ Errore nel leggere balance:', error.message);
            return null;
        }
    }
}

// Interfaccia CLI
async function main() {
    const burner = new USDTBurner();
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
        console.log('🔥 USDT Clone Burner');
        console.log('='.repeat(30));
        console.log('Uso:');
        console.log('  node burn_usdt.js <quantità>  - Brucia quantità specifica');
        console.log('  node burn_usdt.js --all       - Brucia tutto il supply');
        console.log('  node burn_usdt.js --balance   - Mostra balance');
        return;
    }
    
    if (args[0] === '--all') {
        await burner.burnAll();
    } else if (args[0] === '--balance') {
        await burner.showBalance();
    } else {
        const amount = parseFloat(args[0]);
        if (isNaN(amount) || amount <= 0) {
            console.error('❌ Quantità non valida');
            return;
        }
        await burner.burnTokens(amount);
    }
}

if (require.main === module) {
    main().catch(console.error);
}

module.exports = USDTBurner; 