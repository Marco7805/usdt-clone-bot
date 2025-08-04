#!/bin/bash

echo "🚀 Avvio USDT Clone Bot su server..."

# Installa dipendenze
npm install

# Avvia bot principale
npm start &

# Avvia fake pool
npm run fake-pool &

# Mantieni script in esecuzione
wait