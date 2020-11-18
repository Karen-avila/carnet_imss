FROM node:12.18.4-alpine3.9

RUN addgroup --system quasar \
    && adduser --system --ingroup quasar quasar

COPY --chown=quasar:quasar package*.json ./

RUN npm install -g @quasar/cli

COPY --chown=quasar:quasar . .

RUN npm i
RUN npm rebuild node-sass

EXPOSE 8080

WORKDIR /app

USER django

CMD npm run dev
