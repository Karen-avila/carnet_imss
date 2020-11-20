FROM node:12.18.4-alpine3.9

RUN apk update
ARG USER=default
RUN apk add --update sudo

ENV HOME /home/$USER

ENV AUTHENDPOINT=https://msapop-autenticacion.cloudapps.imss.gob.mx
ENV MONGOENDPOINT=https://msapop-consulta-apop.cloudapps.imss.gob.mx
ENV DEBUGG=False

RUN adduser -D $USER \
        && echo "$USER ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/$USER \
        && chmod 0440 /etc/sudoers.d/$USER

WORKDIR /app
COPY ./ /app
RUN npm install -g @quasar/cli

RUN npm i
RUN npm rebuild node-sass
RUN chmod -R 771 /app
RUN chown -R default:root /app

EXPOSE 8080
CMD npm run dev
