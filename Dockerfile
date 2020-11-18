FROM node:12.18.4-alpine3.9

RUN apk add default

COPY package*.json .

RUN npm install -g @quasar/cli

COPY . .

RUN npm i
RUN npm rebuild node-sass

EXPOSE 8080

RUN chown -R 771 ./
RUN chown -R default:root ./

WORKDIR /app

CMD npm run dev
