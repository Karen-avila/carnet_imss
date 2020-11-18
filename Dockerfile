FROM node:12.18.4-alpine3.9
RUN apk update
ARG USER=default
ENV HOME /home/$USER
RUN adduser -D $USER \
        && echo "$USER ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/$USER \
        && chmod 0440 /etc/sudoers.d/$USER
        
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
