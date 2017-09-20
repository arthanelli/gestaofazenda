FROM node:boron

# Diretorio do porjeto
WORKDIR /home/raraujo/projetos/gestaofazenda

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

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]

