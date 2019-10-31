FROM node:10

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN npm install -g yarn
RUN yarn

COPY . .

RUN yarn build

EXPOSE 3000
CMD [ "node", "build/index.js" ]
