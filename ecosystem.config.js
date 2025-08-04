module.exports = {
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
};