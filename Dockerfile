FROM nginx:alpine

ARG USER=www-data

COPY ./dist/spa /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
