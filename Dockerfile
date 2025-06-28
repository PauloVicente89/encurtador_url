FROM node:22-alpine

ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV:-development}

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY prisma ./prisma/
RUN npx prisma generate

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]