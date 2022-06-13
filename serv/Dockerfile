FROM node:18.2.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY .dockerignore ./

COPY ./dist ./dist

CMD ["npm","run","start:dev"]