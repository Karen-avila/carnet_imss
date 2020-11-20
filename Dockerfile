FROM nginx:alpine


RUN rm -rf /usr/share/nginx/html/*
COPY ./dist/spa /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/nginx.conf
COPY bin/uid_entrypoint /bin/uid_entrypoint

ENV PATH /usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin

USER nginx:nginx
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
