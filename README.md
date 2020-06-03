# Trello like concept API

Este é o backend para meu frontend [trello-like-concept](https://github.com/lavesan/trello-like-concept) consumir.

## Pré-requisitos

- node
- npm
- git
- mongodb

## Executando

Se você é um programador e quer executar minha API, é só seguir os passos abaixo:

1. Execute `npm i` para instalar os pacotes
2. Crie um arquivo `.env` no mesmo nível do arquivo `.env.example`, seguindo o mesmo padrão que há no .example, alterando para suas configurações de database
3. Execute o projeto em dev na porta 3000 com o comando `npm run start:dev`

## Produção

Para gerar o build de produção e executar é bem simples:

1. Execute `npm run build` para gerar o build
2. Executa `npm run start:prod` para iniciar o projeto apartir do build :)
