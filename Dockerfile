FROM postgres:17-bookworm

LABEL maintainer="DennisJ"

RUN apt-get update

RUN apt-get update \
    && apt-get install -y curl \
    && apt-get -y install postgresql-17-cron

RUN echo "shared_preload_libraries='pg_cron'" >> /usr/share/postgresql/postgresql.conf.sample
RUN echo "cron.database_name='avnadmin'" >> /usr/share/postgresql/postgresql.conf.sample
