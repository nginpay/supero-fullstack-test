FROM node:18-alpine

WORKDIR /docs

COPY package*.json ./
RUN npm install

COPY . .


CMD ["node", "index"]
