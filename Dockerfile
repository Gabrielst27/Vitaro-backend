# syntax=docker/dockerfile:1

ARG NODE_VERSION=22.16.0

FROM node:${NODE_VERSION}-alpine as base

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install

ENV NODE_ENV=development

COPY . .

EXPOSE 3000

CMD npm run start:dev
