FROM node:24-alpine3.21

ARG NODE_ENV

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
COPY . . 

RUN npm ci

EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]