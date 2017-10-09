FROM node:6.11.3-alpine

RUN npm install nodemon gulp browser-sync -g 

ADD ./app  /app

WORKDIR /app

# CMD ["nodemon", "-L", "index.js"]
# CMD ["node", "index"]
