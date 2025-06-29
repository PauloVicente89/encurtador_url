## Description
Repositório para teste técnico da Teddy Open Finance

Stack:
- Docker
- NestJS
- PostgreSQL

Estrutura de dados:
https://drive.google.com/file/d/1gmRosW1Ec8vLtZBnqSuStCdbG0qmE_X0/view?usp=sharing

## Project setup
```bash
$ docker-compose up -d --build 
```

* Para usar o seu link de redirecionamento, basta inserir o retorno da API na barra de pesquisa do navegador *

## Pontos de melhoria
1. Em caso de escalabilidade horizontal seria interessante criar um microserviço para tratar a parte do redirecionamento, pois podem ocorrer várias requisições num curto espaço de tempo

2. Criar um container para alguma mensageria (kafka, rabbitmq, etc.)

3. Utilizar o serviço ECS da AWS para escalar horizontalmente


## Run tests
```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

