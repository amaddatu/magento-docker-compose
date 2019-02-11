FROM php:7.1.26-fpm-alpine3.9

#ENV PHP_EXTRA_CONFIGURE_ARGS --with-freetype-dir=/usr/lib/

RUN docker-php-ext-install bcmath
RUN docker-php-ext-enable bcmath

#Install Imagick
RUN apk add --update freetype-dev libpng-dev libjpeg-turbo-dev libmcrypt-dev libxml2-dev libxslt-dev autoconf g++ imagemagick imagemagick-dev libtool file make \
    && pecl install imagick
RUN docker-php-ext-enable imagick


#Install intl
RUN set -xe \
    && apk add --update \
        icu \
    && apk add --no-cache --virtual .php-deps \
        make \
    && apk add --no-cache --virtual .build-deps \
        $PHPIZE_DEPS \
        zlib-dev \
        icu-dev \
        g++ \
    && docker-php-ext-configure intl \
    && docker-php-ext-install \
        intl \
    && docker-php-ext-enable intl \
    && { find /usr/local/lib -type f -print0 | xargs -0r strip --strip-all -p 2>/dev/null || true; } \
    && apk del .build-deps \
    && rm -rf /tmp/* /usr/local/lib/php/doc/* /var/cache/apk/*


# RUN apk add --update zlib1g-dev libicu-dev make
# RUN docker-php-ext-install intl
# RUN docker-php-ext-enable intl
RUN docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/
RUN docker-php-ext-install gd
RUN docker-php-ext-enable gd


#Install mcrypt
#RUN apt-get update \
#    && apt-get install -y \
#        libmcrypt-dev
RUN docker-php-ext-install mcrypt
RUN docker-php-ext-enable mcrypt

RUN docker-php-ext-install soap
RUN docker-php-ext-enable soap

#Install xsl
#RUN apt-get install -y libxslt-dev
RUN docker-php-ext-install xsl
RUN docker-php-ext-enable xsl

RUN docker-php-ext-install zip
RUN docker-php-ext-enable zip
RUN docker-php-ext-install opcache
RUN docker-php-ext-enable opcache

RUN docker-php-ext-install pdo_mysql
RUN docker-php-ext-enable pdo_mysql

RUN docker-php-ext-install mysqli
RUN docker-php-ext-enable mysqli

ENV PHPREDIS_VERSION 4.2.0

RUN mkdir -p /usr/src/php/ext/redis \
    && curl -L https://github.com/phpredis/phpredis/archive/$PHPREDIS_VERSION.tar.gz | tar xvz -C /usr/src/php/ext/redis --strip 1 \
    && echo 'redis' >> /usr/src/php-available-exts \
    && docker-php-ext-install redis

RUN addgroup -g 1001 -S docker
RUN adduser -u 1000 -S -D -g docker magento

