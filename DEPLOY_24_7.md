# 🚀 DEPLOY BOT 24/7 - USDT CLONE

## 📋 **OPZIONI SERVER CLOUD**

### 🆓 **GRATUITI (Facili)**

#### 1. **Railway** (Raccomandato)
```bash
# Installa Railway CLI
npm install -g @railway/cli

# Login
railway login

# Deploy
railway up
```

#### 2. **Heroku**
```bash
# Installa Heroku CLI
brew install heroku/brew/heroku

# Login
heroku login

# Crea app e deploy
heroku create usdt-clone-bot
git push heroku main
```

### 💰 **A PAGAMENTO (Potenti)**

#### 3. **DigitalOcean App Platform**
```bash
# Installa doctl
brew install doctl

# Login
doctl auth init

# Deploy
doctl apps create --spec app.yaml
```

#### 4. **AWS EC2**
```bash
# Installa AWS CLI
brew install awscli

# Configura
aws configure

# Deploy
aws ec2 run-instances --image-id ami-123456 --instance-type t2.micro
```

#### 5. **Google Cloud Run**
```bash
# Installa gcloud
brew install google-cloud-sdk

# Login
gcloud auth login

# Deploy
gcloud run deploy usdt-bot --source .
```

### 🐳 **DOCKER (Locale/Server)**

#### 6. **Docker Compose**
```bash
# Avvia con Docker
docker-compose up -d

# Verifica
docker-compose ps

# Logs
docker-compose logs -f
```

### ⚡ **PM2 (Server Dedicato)**

#### 7. **PM2 Process Manager**
```bash
# Installa PM2
npm install -g pm2

# Avvia bot
pm2 start ecosystem.config.js

# Monitora
pm2 monit

# Logs
pm2 logs
```

## 🔧 **CONFIGURAZIONE RAPIDA**

### **Opzione 1: Railway (Gratuito)**
```bash
cd ~/usdt_clone_project
npm install -g @railway/cli
railway login
railway up
```

### **Opzione 2: Heroku (Gratuito)**
```bash
cd ~/usdt_clone_project
brew install heroku/brew/heroku
heroku login
heroku create usdt-clone-bot
git add .
git commit -m "Deploy bot"
git push heroku main
```

### **Opzione 3: Docker (Locale)**
```bash
cd ~/usdt_clone_project
docker-compose up -d
```

## 📊 **MONITORAGGIO**

### **Health Check**
- **URL**: `https://tuo-app.railway.app/health`
- **Status**: `{"status":"OK","bot":"USDT Clone Bot Running"}`

### **Logs**
```bash
# Railway
railway logs

# Heroku
heroku logs --tail

# Docker
docker-compose logs -f

# PM2
pm2 logs
```

## 🔄 **RESTART AUTOMATICO**

Tutti i provider supportano restart automatico:
- **Railway**: Restart su errore
- **Heroku**: Dyno restart automatico
- **Docker**: `restart: unless-stopped`
- **PM2**: `autorestart: true`

## 💰 **COSTI STIMATI**

| Provider | Piano | Costo/Mese |
|----------|-------|------------|
| Railway | Hobby | $5 |
| Heroku | Eco | $5 |
| DigitalOcean | Basic | $12 |
| AWS EC2 | t2.micro | $8 |
| Google Cloud | f1-micro | $6 |

## 🎯 **RISULTATO FINALE**

✅ **Bot funziona 24/7**  
✅ **PC spento = Bot attivo**  
✅ **Restart automatico**  
✅ **Monitoraggio online**  
✅ **Logs accessibili**  
✅ **Scalabilità automatica**  

## 🚀 **COMANDI RAPIDI**

```bash
# Deploy Railway
railway up

# Deploy Heroku
heroku create && git push heroku main

# Deploy Docker
docker-compose up -d

# Deploy PM2
pm2 start ecosystem.config.js

# Verifica status
curl https://tuo-app.railway.app/health
```

## 📱 **NOTIFICHE**

Il bot invierà notifiche su:
- **Telegram** (se configurato)
- **Discord** (se configurato)
- **Email** (se configurato)

## 🔐 **SICUREZZA**

- ✅ Chiavi private criptate
- ✅ HTTPS automatico
- ✅ Firewall configurato
- ✅ Backup automatico

---

**🎉 IL BOT FUNZIONERÀ ANCHE CON IL PC SPENTO!** 