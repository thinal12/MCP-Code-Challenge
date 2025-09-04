FROM node:lts-alpine

WORKDIR /mcp-code-challenge

COPY package*.json ./

RUN npm install

COPY . .