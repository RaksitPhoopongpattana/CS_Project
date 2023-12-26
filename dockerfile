FROM  php:5.4-apache  
COPY 000-default.conf /etc/apache2/sites-available/000-default.conf

RUN a2enmod rewrite

WORKDIR /var/www/html

COPY ./html /var/www/html/ 

RUN chown -R www-data:www-data /var/www/html

RUN docker-php-ext-install mysql \
    && docker-php-ext-enable mysql \
    && docker-php-ext-install pdo \
    && docker-php-ext-enable pdo

EXPOSE 80

CMD ["/usr/sbin/apachectl", "-D", "FOREGROUND"]