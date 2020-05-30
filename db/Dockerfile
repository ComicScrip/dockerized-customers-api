# Derived from official mysql image (our base image)
FROM mysql
# All scripts in docker-entrypoint-initdb.d/ are automatically
# executed during container startup
COPY ./init.sql /docker-entrypoint-initdb.d/