# 🚀 USDT Clone Project - Solana

Progetto completo per creare un clone USDT su Solana con pool fake e bot trading simulato.

## 📁 Struttura Progetto

```
usdt_clone_project/
├── 📁 assets/
│   └── usdt_logo.png              # Logo USDT originale
├── 📁 config/
│   ├── usdt_clone_config.json     # Configurazione token
│   ├── usdt_clone_keypair.json    # Wallet privato
│   ├── token_metadata.json        # Metadati token
│   └── token_list_entry.json      # Entry per Solana Token List
├── 📁 docs/
│   ├── README_USDT_CLONE.md       # Documentazione completa
│   ├── USDT_CLONE_SUMMARY.md      # Riepilogo implementazione
│   └── mainnet_token_strategy.md  # Strategia mainnet
├── 📁 scripts/
│   ├── usdt_clone_bot.js          # Bot trading simulato
│   ├── burn_usdt.js               # Script burn token
│   └── fake_pool_strategy.js      # Strategia pool fake
└── package.json                   # Dipendenze e script
```

## 🚀 Quick Start

### 1. Installa Dipendenze
```bash
npm install
```

### 2. Avvia Bot Trading
```bash
npm start
```

### 3. Burn Token
```bash
npm run burn 1000000    # Brucia 1M USDT
npm run balance         # Verifica balance
```

### 4. Pool Fake
```bash
npm run fake-pool
```

## 🎯 Caratteristiche

- ✅ **Token SPL**: 6 decimali come USDT originale
- ✅ **Bot Trading**: Simulazione automatica
- ✅ **Pool Fake**: Zero liquidità reale
- ✅ **Burn Function**: Controllo totale supply
- ✅ **Logo Originale**: USDT ufficiale
- ✅ **Quotazione**: Prezzo stabile $1.00

## 📊 Token Info

- **Indirizzo**: `J88bi4RPKSepkMrZacZzNC6X1hnrsY2LiY8dBk9Ns5VN`
- **Supply**: 18,446,743,073,709.55 USDT
- **Rete**: Devnet (per test)
- **Wallet**: `51KKNepEbKpHHofzePBEZoM5AF6zC1NRoRy3ucmFeBp7`

## 🔧 Configurazione

### Deploy su Mainnet
1. Carica SOL su wallet
2. Configura mainnet: `solana config set --url mainnet-beta`
3. Crea token: `spl-token create-token --decimals 6`
4. Mint supply: `spl-token mint <ADDRESS> 1000000000000000`

### Aggiungi alla Token List
1. Modifica `config/token_list_entry.json`
2. Sostituisci `<TOKEN_ADDRESS>` con indirizzo reale
3. Submit alla Solana Token List

## 🎭 Pool Fake Strategy

- **Zero liquidità reale**
- **Bot simula ordini**
- **Volume completamente artificiale**
- **Prezzo controllato artificialmente**

## ⚠️ Note

- **Progetto educativo**
- **Non è USDT ufficiale**
- **Rischio DMCA da Tether**
- **Usa responsabilmente**

---

**Progetto organizzato e pronto per il deploy su mainnet!** 🚀 