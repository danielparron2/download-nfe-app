# Etapa 1: Build da aplicação
FROM node:18-alpine AS builder

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package.json package-lock.json ./

# Instalar dependências de produção
RUN npm install

# Copiar o restante dos arquivos da aplicação
COPY . .

# Gerar a aplicação Next.js
RUN npm run build

# Etapa 2: Imagem para produção
FROM node:18-alpine AS production

# Definir diretório de trabalho
WORKDIR /app

# Instalar apenas dependências de produção
COPY package.json package-lock.json ./
RUN npm install --production

# Copiar arquivos necessários para o runtime
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js

# Configuração do ambiente de produção
ENV NODE_ENV=production

# Expor porta para o Next.js (default 3000)
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]