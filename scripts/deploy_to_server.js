#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 DEPLOY BOT SU SERVER CLOUD');
console.log('='.repeat(40));

// Configurazioni server
const serverConfig = {
    // Opzioni server cloud
    providers: {
        '1': { name: 'Railway', command: 'railway up' },
        '2': { name: 'Heroku', command: 'heroku create && git push heroku main' },
        '3': { name: 'DigitalOcean', command: 'doctl apps create --spec app.yaml' },
        '4': { name: 'AWS EC2', command: 'aws ec2 run-instances --image-id ami-123456 --instance-type t2.micro' },
        '5': { name: 'Google Cloud', command: 'gcloud run deploy usdt-bot --source .' }
    }
};

// Crea Procfile per Heroku
function createProcfile() {
    const procfile = `web: node scripts/usdt_clone_bot.js
worker: node scripts/fake_pool_strategy.js`;
    
    fs.writeFileSync('./Procfile', procfile);
    console.log('✅ Procfile creato per Heroku');
}

// Crea app.yaml per Google Cloud
function createAppYaml() {
    const appYaml = `runtime: nodejs18
env: standard
automatic_scaling:
  target_cpu_utilization: 0.6
  min_instances: 1
  max_instances: 10
env_variables:
  NODE_ENV: production
  SOLANA_RPC_URL: https://api.mainnet-beta.solana.com
  WALLET_PATH: ./config/solflare_wallet.json
handlers:
  - url: /.*
    script: auto
    secure: always`;
    
    fs.writeFileSync('./app.yaml', appYaml);
    console.log('✅ app.yaml creato per Google Cloud');
}

// Crea Dockerfile
function createDockerfile() {
    const dockerfile = `FROM node:18-alpine

WORKDIR /app

# Copia package.json e installa dipendenze
COPY package*.json ./
RUN npm ci --only=production

# Copia il codice
COPY . .

# Crea directory config se non esiste
RUN mkdir -p config

# Esponi porta
EXPOSE 3000

# Comando di avvio
CMD ["npm", "start"]`;
    
    fs.writeFileSync('./Dockerfile', dockerfile);
    console.log('✅ Dockerfile creato');
}

// Crea docker-compose.yml
function createDockerCompose() {
    const dockerCompose = `version: '3.8'

services:
  usdt-bot:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
    volumes:
      - ./config:/app/config
    restart: unless-stopped
    
  fake-pool:
    build: .
    command: npm run fake-pool
    environment:
      - NODE_ENV=production
    volumes:
      - ./config:/app/config
    restart: unless-stopped`;
    
    fs.writeFileSync('./docker-compose.yml', dockerCompose);
    console.log('✅ docker-compose.yml creato');
}

// Crea script per Railway
function createRailwayConfig() {
    const railwayJson = `{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm start",
    "healthcheckPath": "/health",
    "healthcheckTimeout": 100,
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}`;
    
    fs.writeFileSync('./railway.json', railwayJson);
    console.log('✅ railway.json creato');
}

// Crea endpoint di health check
function createHealthCheck() {
    const healthCheck = `const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        bot: 'USDT Clone Bot Running'
    });
});

app.get('/', (req, res) => {
    res.json({ 
        message: 'USDT Clone Bot is running',
        token: '59qfawpS114aAY6wAu9RfZfP9wSShLc15rJSVZ5iGWrt',
        owner: 'CQGqaL3djnRbPwTA1RFppzavQyD6QggUFUAwfKp3JR9G'
    });
});

app.listen(port, () => {
    console.log(\`🚀 Server running on port \${port}\`);
});

module.exports = app;`;
    
    fs.writeFileSync('./scripts/health_check.js', healthCheck);
    console.log('✅ Health check endpoint creato');
}

// Crea script di avvio per server
function createStartScript() {
    const startScript = `#!/bin/bash

echo "🚀 Avvio USDT Clone Bot su server..."

# Installa dipendenze
npm install

# Avvia bot principale
npm start &

# Avvia fake pool
npm run fake-pool &

# Mantieni script in esecuzione
wait`;
    
    fs.writeFileSync('./start_server.sh', startScript);
    execSync('chmod +x ./start_server.sh');
    console.log('✅ Script di avvio server creato');
}

// Crea PM2 config per gestione processi
function createPM2Config() {
    const pm2Config = `module.exports = {
  apps: [
    {
      name: 'usdt-bot',
      script: 'scripts/usdt_clone_bot.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        SOLANA_RPC_URL: 'https://api.mainnet-beta.solana.com'
      }
    },
    {
      name: 'fake-pool',
      script: 'scripts/fake_pool_strategy.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};`;
    
    fs.writeFileSync('./ecosystem.config.js', pm2Config);
    console.log('✅ Configurazione PM2 creata');
}

// Menu principale
function showMenu() {
    console.log('\\n📋 SCEGLI IL SERVER CLOUD:');
    console.log('1. Railway (Gratuito, facile)');
    console.log('2. Heroku (Gratuito, facile)');
    console.log('3. DigitalOcean (A pagamento, potente)');
    console.log('4. AWS EC2 (A pagamento, scalabile)');
    console.log('5. Google Cloud (A pagamento, enterprise)');
    console.log('6. Docker (Locale o server)');
    console.log('7. PM2 (Server dedicato)');
    console.log('0. Esci');
}

// Funzione principale
async function main() {
    console.log('🔧 Preparazione file per deploy...');
    
    // Crea tutti i file necessari
    createProcfile();
    createAppYaml();
    createDockerfile();
    createDockerCompose();
    createRailwayConfig();
    createHealthCheck();
    createStartScript();
    createPM2Config();
    
    console.log('\\n✅ Tutti i file di deploy creati!');
    
    showMenu();
    
    // Simula input utente (in realtà dovrebbe essere interattivo)
    console.log('\\n💡 Per deployare:');
    console.log('1. Scegli un provider cloud');
    console.log('2. Segui le istruzioni specifiche');
    console.log('3. Il bot funzionerà 24/7');
    
    console.log('\\n🚀 COMANDI RAPIDI:');
    console.log('Railway: railway up');
    console.log('Heroku: heroku create && git push heroku main');
    console.log('Docker: docker-compose up -d');
    console.log('PM2: pm2 start ecosystem.config.js');
}

if (require.main === module) {
    main().catch(console.error);
}

module.exports = { 
    createProcfile, 
    createAppYaml, 
    createDockerfile,
    createDockerCompose,
    createRailwayConfig,
    createHealthCheck,
    createStartScript,
    createPM2Config
}; 