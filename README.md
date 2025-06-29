## Description
Encurtador de URLs para teste técnico da Teddy Open Finance

Stack:
- Docker
- NestJS
- PostgreSQL
- PM2

Estrutura de dados:
https://drive.google.com/file/d/1gmRosW1Ec8vLtZBnqSuStCdbG0qmE_X0/view?usp=sharing

## Project setup
* Obrigatório ter o docker instalado na máquina
* Alterar o arquivo '.env.example' apenas para '.env'
```bash
$ docker-compose up -d --build
```

## Swagger
URL: http://localhost:3000/docs

* Para usar o seu link de redirecionamento, basta inserir o retorno da API na barra de pesquisa do navegador *

A API é inicializada no modo cluster: 
- Para aplicativos Node.js, o PM2 inclui um balanceador de carga automático que compartilhará todas as conexões HTTP[s]/Websocket/TCP/UDP entre cada processo gerado

## Observabilidade
Para monitorar o funcionamento da API:
- docker exec -it api pm2 monit

Caso queira observar apenas as ultimas 200 linhas dos logs:
- docker exec -it api pm2 logs --lines 200

Caso queira uma observabilidade com gráficos em uma dashboard (Exige autenticação):
- docker exec -it api pm2 plus

## Pontos de melhoria
1. Em caso de escalabilidade horizontal seria interessante dividir a aplicação em microserviços:
- Criar um microserviço para tratar a parte do redirecionamento, pois podem ocorrer várias requisições num curto espaço de tempo
- Acredito que outro microserviço para o resto das atividades já daria conta

2. Criar um container para alguma mensageria (kafka, rabbitmq, etc.)

3. Utilizar o serviço ECS da AWS para escalar horizontalmente


<!-- ## Run tests
```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
``` -->

