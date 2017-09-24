# Milma
Para rodar o projeto precisa executar os seguintes comandos.

```sh
$ npm install -g nodemon gulp
$ npm install
```
Para subir o ambiente de desenvolvimento
```sh
$ npm start
```
Abrirar no  [locahost:3000](locahost:3000)

## Requisitos
* [Node 6.11.3](https://nodejs.org/en/)
* [Postgresql](https://www.postgresql.org/)
ou
* [Docker](https://docs.docker.com/docker-for-windows/install/)
* [Docker composer](https://docs.docker.com/compose/install/#install-compose)

### Banco de dados
Se for a primeira vez que roda o projeto, crie o banco de dados no `postgres` chamado `gestaofazenda`, se o banco estiver local entre nele e crie, se estiver usando docker só entrar no admin dele [localhost:8080](localhost:8080)

Ajuste os acessos na pasta `app/database/acessos.js` e rode o comando dentro da pasta database para criar as tabelas
```
$ node run create
```

### Docker
Sobe a imagem na sua maquina
```sh
$ docker-compose up -d
```

Lista todas as maquina e suas informações (inclusive ID :D)
```sh
$ docker ps
```

Entra na maquina solicitada, (exit para sair da maquina)
```sh
$ docker exec -it ID_CONTAINER /bin/bash
$ exit
```

Derruba a imagem
```sh
$ docker-compose down
```