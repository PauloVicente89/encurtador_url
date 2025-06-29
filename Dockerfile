FROM node:22-alpine

ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV:-development}

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY prisma ./prisma/
RUN npx prisma generate
RUN npm install pm2@latest -g

COPY . .

EXPOSE 3000

CMD ["pm2", "start", "dist/main.js", "--name", "teddy-open-finance", "-i", "max", "--no-daemon"]