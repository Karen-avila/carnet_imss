# Dockerfile
FROM docker-registry.default.svc:5000/openshift/ubi7
WORKDIR /app
USER root

#Instalar NGINX
COPY nginx.repo /etc/yum.repos.d/nginx.repo
RUN yum -y install nginx

COPY ./dist/spa /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
ENTRYPOINT ["nginx","-g","daemon off;"]
