FROM node:12.18.4-alpine3.9
RUN apk update
ARG USER=default
RUN apk add --update sudo
ENV HOME /home/$USER
RUN adduser -D $USER \
        && echo "$USER ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/$USER \
        && chmod 0440 /etc/sudoers.d/$USER

#COPY package*.json .
WORKDIR /app
COPY ./ /app
RUN npm install -g @quasar/cli
#COPY ./ .
RUN npm i
RUN npm rebuild node-sass
RUN chmod -R 771 /app
RUN chown -R default:root /app

EXPOSE 8080
CMD npm run dev
