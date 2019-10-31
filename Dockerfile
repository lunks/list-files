FROM node:10

# Create app directory
WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN npm install --only=production
RUN npm run build
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "node", "build/index.js" ]
