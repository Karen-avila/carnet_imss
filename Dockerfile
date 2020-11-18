FROM docker-registry.default.svc:5000/openshift/ubi7
WORKDIR /app
COPY ./ /app/
USER root
#Copiar app a directorio raiz de nginx
COPY /app/dist/spa /usr/share/nginx/html
#Copiar conf de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
ENTRYPOINT ["nginx","-g","daemon off;"]
