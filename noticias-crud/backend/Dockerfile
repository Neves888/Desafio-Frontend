FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

RUN npm install -g json-server

COPY . ./

EXPOSE 5000

CMD ["node", "server.js"]
