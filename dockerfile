FROM node:lts-alpine

ARG NODE_ENV

WORKDIR /var/www/backend

RUN apk add bash

RUN npm i -g typescript ts-node nodemon @nestjs/cli

RUN if [[ ${NODE_ENV} = 'production' ]]; then npm i -g pm2; fi

COPY ./package.json ./

COPY . .

RUN if [[ ${NODE_ENV} = 'development' ]]; then npm install; else npm install --only=prod && npm install --only=dev ; fi

RUN npm install

RUN npm install source-map-support

RUN ls -l -a

EXPOSE 8080