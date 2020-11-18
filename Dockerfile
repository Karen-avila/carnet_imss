# Dockerfile
FROM nginx:1.17
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /app
COPY ./dist/spa /app/
RUN cp -R /app/dist/spa /usr/share/nginx/html
EXPOSE 8080:8080
CMD ["nginx", "-g", "daemon off;"]
