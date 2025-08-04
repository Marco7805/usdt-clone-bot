# 🚀 USDT Clone su Solana

Clone completo di USDT su Solana con bot trading simulato e funzionalità di burn.

## 📋 Caratteristiche

- ✅ **Token SPL**: 6 decimali come USDT originale
- ✅ **Supply**: 18,446,744,073,709.55 USDT (1 miliardo+)
- ✅ **Bot Trading**: Simulazione automatica di volume e prezzo
- ✅ **Burn Function**: Controllo totale del supply
- ✅ **Logo Originale**: Logo USDT ufficiale
- ✅ **Quotazione**: Prezzo stabile a $1.00

## 🔧 Configurazione

### Token Info
- **Indirizzo**: `J88bi4RPKSepkMrZacZzNC6X1hnrsY2LiY8dBk9Ns5VN`
- **Account**: `Cbu3sukda8tm4JvvkUucE3fMhnTSAqJ2Z9JRPBy1opAH`
- **Wallet Owner**: `51KKNepEbKpHHofzePBEZoM5AF6zC1NRoRy3ucmFeBp7`
- **Rete**: Devnet (per test)

## 🚀 Avvio Bot Trading

```bash
# Installa dipendenze
npm install @solana/web3.js @solana/spl-token

# Avvia bot trading
node usdt_clone_bot.js
```

Il bot simulerà:
- 📊 Trading automatico ogni 30 secondi
- 💰 Volume casuale tra $1K-$50K
- 📈 Prezzo stabile intorno a $1.00
- 🔄 Variazioni realistiche ±2%

## 🔥 Funzioni Burn

### Brucia quantità specifica
```bash
node burn_usdt.js 1000000
```

### Brucia tutto il supply
```bash
node burn_usdt.js --all
```

### Mostra balance
```bash
node burn_usdt.js --balance
```

## 📊 Comandi Solana CLI

### Verifica balance
```bash
source "$HOME/.cargo/env"
spl-token balance J88bi4RPKSepkMrZacZzNC6X1hnrsY2LiY8dBk9Ns5VN
```

### Burn manuale
```bash
source "$HOME/.cargo/env"
spl-token burn J88bi4RPKSepkMrZacZzNC6X1hnrsY2LiY8dBk9Ns5VN <quantità>
```

### Burn totale
```bash
source "$HOME/.cargo/env"
spl-token burn J88bi4RPKSepkMrZacZzNC6X1hnrsY2LiY8dBk9Ns5VN --all
```

## 🎯 Strategia di Mercato

### Bot Trading
- **Volume 24h**: $100K-$500K simulato
- **Prezzo target**: $1.00 USD
- **Variazione max**: ±2%
- **Frequenza**: Ogni 30 secondi

### Burn Strategy
- **Burn graduale**: Riduci supply quando prezzo sale
- **Burn totale**: In caso di necessità
- **Controllo**: Solo tu puoi bruciare token

## 🔗 Link Utili

- **Solscan**: https://solscan.io/token/J88bi4RPKSepkMrZacZzNC6X1hnrsY2LiY8dBk9Ns5VN
- **Devnet Explorer**: https://explorer.solana.com/?cluster=devnet
- **Logo USDT**: usdt_logo.png

## ⚠️ Note Importanti

1. **Rete Devnet**: Per test, non mainnet
2. **Supply Limitato**: 18,446,744,073,709.55 USDT max
3. **Burn Authority**: Solo il wallet owner può bruciare
4. **Bot Simulato**: Non è trading reale
5. **Quotazione**: Simulata, non su exchange reali

## 🎮 Controllo Totale

Hai controllo completo su:
- ✅ Supply del token
- ✅ Bot trading
- ✅ Funzioni di burn
- ✅ Prezzo simulato
- ✅ Volume simulato

## 🚀 Prossimi Passi

1. **Test su Devnet**: Verifica funzionalità
2. **Deploy Mainnet**: Quando pronto
3. **Pool Liquidity**: Aggiungi liquidità reale
4. **Exchange Listing**: Richiedi listing
5. **Marketing**: Promuovi il token

---

**⚠️ Disclaimer**: Questo è un progetto educativo. Non è USDT ufficiale. 