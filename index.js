#!/usr/bin/env node

const express = require('express');
const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 AVVIO USDT CLONE BOT SU RAILWAY');
console.log('='.repeat(40));

// Configurazione Express per health check
const app = express();
const PORT = process.env.PORT || 3000;

// Health check endpoint
app.get('/', (req, res) => {
    res.json({
        status: 'OK',
        service: 'USDT Clone Bot',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        version: '1.0.0'
    });
});

app.get('/health', (req, res) => {
    res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Avvia il server Express
app.listen(PORT, () => {
    console.log(`✅ Health check server avviato su porta ${PORT}`);
    console.log(`🔗 Health check: http://localhost:${PORT}/health`);
});

// Avvia il bot principale
console.log('🤖 Avvio bot USDT Clone...');
const botProcess = spawn('node', ['scripts/usdt_clone_bot.js'], {
    stdio: 'inherit',
    cwd: __dirname
});

// Avvia anche il fake pool
console.log('🎭 Avvio fake pool...');
const poolProcess = spawn('node', ['scripts/fake_pool_strategy.js'], {
    stdio: 'inherit',
    cwd: __dirname
});

// Gestione errori
botProcess.on('error', (error) => {
    console.error('❌ Errore bot:', error);
});

poolProcess.on('error', (error) => {
    console.error('❌ Errore fake pool:', error);
});

// Gestione chiusura
process.on('SIGTERM', () => {
    console.log('🛑 Chiusura bot...');
    botProcess.kill();
    poolProcess.kill();
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('🛑 Chiusura bot...');
    botProcess.kill();
    poolProcess.kill();
    process.exit(0);
});

console.log('✅ Tutti i servizi avviati!');
console.log('🎯 Bot funzionante 24/7 su Railway!'); 