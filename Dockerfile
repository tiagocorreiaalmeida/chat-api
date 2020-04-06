FROM node:13.12.0-stretch

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --silent

COPY . .

CMD [ "npm", "start" ]