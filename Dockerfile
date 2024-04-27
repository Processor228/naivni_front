FROM node:18-alpine AS external-website

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .


RUN npm ci
RUN npm run build


CMD ["node","build/index.js"]
