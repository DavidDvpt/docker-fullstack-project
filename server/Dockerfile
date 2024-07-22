# Dockerfile for Express API
# api/Dockerfile
FROM node:22-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . ./

EXPOSE 8000

CMD ["npm", "start"]