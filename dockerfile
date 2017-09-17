FROM node:boron

<<<<<<< HEAD
# Diretorio do porjeto
WORKDIR /home/raraujo/projetos/gestaofazenda
=======
RUN npm install nodemon gulp browser-sync -g 
>>>>>>> 7a4c8b42a36d06a19d9b3e8e2a07f9f96e2b56dc

# Install app dependencies
COPY package.json .
# For npm@5 or later, copy package-lock.json as well
# COPY package.json package-lock.json ./

RUN npm install \
  && apt-get update \
  && apt-get install -y postgresql postgresql-contrib \
  && apt-get install sudo \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* \
  && sudo apt-get install git

<<<<<<< HEAD
# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]

=======
# CMD ["nodemon", "-L", "index.js"]
# CMD ["npm", "start"]
>>>>>>> 7a4c8b42a36d06a19d9b3e8e2a07f9f96e2b56dc
