FROM ubuntu
ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install -y nodejs

#Copy PHP files
COPY ./ /code/website

EXPOSE 3333
CMD ["node", "/code/website/index.js"]