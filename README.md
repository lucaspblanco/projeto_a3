# Requerimentos mínimos para o funcionamento da aplicação
- RabbitMQ
- MongoDB
Ambos podem ser inicializados de forma simples com o docker utilizando docker-images oficiais disponibilizadas no Docker Hub, ou do jeito que preferir.

As configurações de conexão devem ser informadas no arquivo config.js

```
https://hub.docker.com/_/rabbitmq
https://hub.docker.com/_/mongo
```

# Microserviços de Pedido
Aplicação  contruída em Node.js e Express.js. Estrutura de microserviços utilizando RabbitMQ.

## Instalando serviços
```bash
cd product-service && npm install
cd order-service && npm install
```
Execute o RabbitMQ:

`docker run -p 5672:5672 rabbitmq`

Execute o MongoDB:

`docker run -p 27017:27017 mongo`


## ATENÇÃO: RabbitMQ e MongoDB precisam estar em execução antes de iniciar os serviços.

Para inicializar cada serviço, acesse o diretório e execute:

`npm run dev`

## ALUNOS (RAs)
- RA 1
- RA 2
- RA 3