FROM nginx:alpine

ARG USER=nginx
RUN apk add --update sudo

ENV HOME /home/$USER

RUN adduser -D $USER \
        && echo "$USER ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/$USER \
        && chmod 0440 /etc/sudoers.d/$USER

COPY ./dist/spa /usr/share/nginx/html

RUN chmod -R 771 /var/cache/nginx
RUN chown -R default:root /var/cache/nginx

RUN chmod -R 771 /usr/sbin
RUN chown -R default:root /usr/sbin

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
