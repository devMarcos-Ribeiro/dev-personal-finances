FROM node:lts-alpine

RUN apk add --no-cache bash

RUN npm install

USER node

WORKDIR /home/node/app
