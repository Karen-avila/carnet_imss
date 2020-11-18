FROM node:12.18.4-alpine3.9
WORKDIR /app
COPY package*.json ./
RUN npm install -g @quasar/cli
COPY . .
RUN npm i
RUN npm rebuild node-sass
EXPOSE 8080:8080
USER root
CMD npm run dev
