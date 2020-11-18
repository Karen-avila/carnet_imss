FROM node:12.18.4-alpine3.9
WORKDIR /app
COPY package*.json ./
RUN npm install -g @quasar/cli
COPY . .
RUN npm i
EXPOSE 8080
CMD [ "npm", "dev" ]
