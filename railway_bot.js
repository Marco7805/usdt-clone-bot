#!/usr/bin/env node

const express = require('express');

console.log('🚀 USDT CLONE BOT - RAILWAY VERSION');
console.log('='.repeat(40));

// Configurazione Express
const app = express();
const PORT = process.env.PORT || 3000;

// Simulazione bot trading
let fakeVolume = 1000000;
let fakePrice = 1.00;
let fakeMarketCap = 1000000000;

// Genera trading fake
function generateFakeTrading() {
    const priceChange = (Math.random() - 0.5) * 0.02; // ±1%
    fakePrice = Math.max(0.98, Math.min(1.02, fakePrice + priceChange));
    
    const volumeChange = Math.random() * 1000 + 100;
    fakeVolume += volumeChange;
    
    const tradeType = Math.random() > 0.5 ? 'BUY' : 'SELL';
    const tradeAmount = Math.random() * 1000 + 100;
    
    console.log(`🎭 FAKE TRADE: ${tradeType} $${tradeAmount.toFixed(2)} @ $${fakePrice.toFixed(4)}`);
    console.log(`🎭 FAKE POOL - Prezzo: $${fakePrice.toFixed(4)} | Volume: $${Math.floor(fakeVolume).toLocaleString()}`);
    
    return {
        price: fakePrice,
        volume: fakeVolume,
        marketCap: fakeMarketCap,
        tradeType,
        tradeAmount
    };
}

// Health check endpoint
app.get('/', (req, res) => {
    const tradingData = generateFakeTrading();
    res.json({
        status: 'OK',
        service: 'USDT Clone Bot - Railway',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        trading: tradingData,
        token: {
            name: 'Tether USD',
            symbol: 'USDT',
            address: 'EFq6E157UTx3PdSFiRo535Gk6i6Zvjkf3TEqZkBXnJ2j',
            supply: '1,000,000,000',
            decimals: 6
        },
        version: '1.0.0'
    });
});

app.get('/health', (req, res) => {
    res.json({ 
        status: 'healthy', 
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

app.get('/trading', (req, res) => {
    const tradingData = generateFakeTrading();
    res.json(tradingData);
});

// Avvia il server
app.listen(PORT, () => {
    console.log(`✅ Bot avviato su porta ${PORT}`);
    console.log(`🔗 Health check: http://localhost:${PORT}/health`);
    console.log(`📊 Trading data: http://localhost:${PORT}/trading`);
    console.log('🎯 Bot funzionante 24/7 su Railway!');
});

// Simula trading ogni 30 secondi
setInterval(() => {
    generateFakeTrading();
}, 30000);

// Simula quotazione ogni minuto
setInterval(() => {
    console.log(`📈 FAKE QUOTATION: $${fakePrice.toFixed(4)} | MC: $${fakeMarketCap.toLocaleString()}`);
}, 60000);

console.log('🤖 Bot inizializzato e pronto!'); 