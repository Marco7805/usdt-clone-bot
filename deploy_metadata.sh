#!/bin/bash

echo "🌐 DEPLOY METADATA SU ARWEAVE"
echo "=============================="

# Installa Arweave CLI se non presente
# npm install -g arweave

# Deploy metadata JSON su Arweave
echo "Deploying metadata to Arweave..."
arweave deploy config/usdt_metadata.json --key-file ~/.arweave/key.json

echo "✅ Metadata deployed to Arweave"
echo "📍 URL: https://arweave.net/[ID]"
