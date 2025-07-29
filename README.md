<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# Isis-commerce-API - Desafio Isi
 Processo seletivo para a vaga de Desenvolvedor Fullstack Júnior.

 Projeto Back-end - API
   
## Ferramentas

- NestJs
- TypeOrm
- PostgreSQL

### Repository


- Application is running on: http://localhost:3010/e-commerce-isi

## Arquitetura Hexagonal
![Modelo de Arquitetura](/asset/image.png)


## Modulos    

### Produtos
#### API routes
- GET /products                  	Lista paginada com filtros avançados.	     
- GET /products/{id}             	Detalhes de um produto.
- POST /products                 	Cria produto. 
- PATCH /products/{id}           	Atualização parcial via JSON Patch;
- DELETE /products/{id}          	Inativa (soft-delete) o produto.

### Coupons
#### API routes
- GET /coupons     	Lista / busca códigos.
- POST /coupons    	Cria cupom.        
- GET /coupons/{code}	Detalhes de cupom. 
- PATCH /coupons/{code}	Edita (exceto code).
- DELETE /coupons/{code}	Inativa cupom.   
  
### Discount-application
#### API routes
- POST /products/discount/{id} 	Aplica cupom promocional.        

## Entidades DB
![Relacionamentos](/asset/db.png)

## Compile and run the project

```bash
# install dependency
$ npm install

# development
$ npm run start

# watch mode
$ npm run dev

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
```bash
# create migrations
$ npm run migration:create

# run migrations
$ npm run migration:run
```
## EM PROGRESSO

- CONTAGEM DE USO DE CUPONS
- VALIDAR CADO CONTAGEM SEJA EQUIVALENTE A MAXIMA
- REMOVER DESCONTO DE CUPOM
- REFINAR MODULO DE DESCONTO
- APLICAÇÃO DE TESTES, APÓS MODIFICAÇÕES 

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## 

- Author - [Beatriz Santana Silva](https://www.linkedin.com/in/beatriz-santana-dev/)


## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
# desafio-isi-front
