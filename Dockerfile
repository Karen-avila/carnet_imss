FROM nginx:alpine

RUN apk update
ARG USER=default
RUN apk add --update sudo

ENV HOME /home/$USER

RUN adduser -D $USER \
        && echo "$USER ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/$USER \
        && chmod 0440 /etc/sudoers.d/$USER

COPY ./dist/spa /usr/share/nginx/html

RUN chmod -R 771 /var/cache/nginx
RUN chown -R default:root /var/cache/nginx

EXPOSE 80
CMD ["sudo /usr/sbin/nginx", "-g", "daemon off;"]
