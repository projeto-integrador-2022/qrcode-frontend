
## Angular
Esse projeto foi gerado em [Angular CLI](https://github.com/angular/angular-cli) versão 13.2.5.

## Yarn
Esse projeto foi gerado em [Yarn](https://yarnpkg.com) version 1.22.17.

```sh
npm install --global yarn

# na pasta do projeto:
yarn
yarn build
yarn start
```

## Node
Esse projeto usa o [Node](https://nodejs.org) versão 14.17.4.



## Git
Esse projeto está sendo versionado em [Git](https://git-scm.com) versão 2.25.1.

```sh
# front-end
git clone git@github.com:projeto-integrador-2022/qrcode-frontend.git
git clone git@github.com:projeto-integrador-2022/qrcode-backend.git

```

## GitHub
Esse projeto usa o GitHub [Github](https://github.com/projeto-integrador-2022)


## Bootstrap
```sh
ng add @ng-bootstrap/ng-bootstrap
npm install --save jquery
npm install --save bootstrap
npm install bootstrap@latest

```

## Docker

Comandos docker

```sh
    # Em qrcode-backend/docker

    # rodar o backend
    docker-compose up -d
    
    # dropar containers
    docker-compose down
    
    # dropar um dos containers
    docker ps
    docker-compose down <container_id>
    
    # depurar o que esta acontecendo no container
    docker logs -f <container_id>
```

## Yarn e NPM

Comandos para rodar o projeto

```sh
    # npm ou yarn

    # para usuários que não precisam derrubar o servidor postgresql para rodar o composer
    npm run go

    # para usuários que  precisam derrubar o servidor postgressado para rodar o composer
    npm run drop-n-go

```