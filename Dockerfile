FROM node:13.3.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --silent

COPY . .

CMD [ "npm", "start" ]