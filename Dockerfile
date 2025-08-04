FROM node:18-alpine

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
CMD ["npm", "start"]