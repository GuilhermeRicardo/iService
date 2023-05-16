# iService
 STADCAS4DA_2301-2301-695394 2301-PROJETO INTEGRADOR: DESENVOLVIMENTO DE SISTEMAS ORIENTADO A DISPOSITIVOS MÓVEIS E BASEADOS NA WEB
 
 
 
## Frond-End: Angular + Angular Material Library.
    
Interface construida utilizando Angular 15 + Angular Materiais.


Ações de criação de nova locação de filme, listagem de filmes locados e exclusão de registro de locação, serão validadas via Jwt Token armazeda no LocalStorage e serão carregadas em cada requisição utilizando Angular Interceptor.

Para inilizar a interface em ambiente local deve ser utilizado o comando '*ng* serve' dentro do repositório '*iServiceSpa/*'
 
## Back-End: API .Net 6.0 + Entity Framework & JWT Bearer Authentication + SQL Server.

###### *Importante: Para utilização do Backend para validação de endpoint será necessário o serviço SQL Server 2019 para criação de um banco de dados local utilizando o comando dotnet ef database update.*
 
  
Para inicializar a API em ambiente local deve-se utilizar o comando '*dotnet* run' dentro do repositório '*iServiceApi/*'

A API estará disponivel a partir do endpoint *'https://localhost:7288;'*. 

Para testes utilizando o SwaggerAPI, utilizar o link: 'https://localhost:7288/swagger/index.html'

## Authentication

Os endpoints disponiveis para registro de novo usuario e login de usuario existente, são respectivamente:

##### Registro: *'https://localhost:7288/api/Authentication/register'*
utilizando Body em JSON em formato:

{
  "name": "string",
  "email": "string",
  "password": "string"
} 

É necessário que a senha(*password*) possua caracteres em caixa alta, baixa, números e caracteres especiais. Segue exemplo de usuario:

{
  "name": "usuario",
  "email": "usuario@gmail.com",
  "password": "PassW0rd! "
}

##### Login: *'https://localhost:7288/api/Authentication/login'*

Para o login, deve ser fornecido Body em JSON no seguinte formato:

{
  "email": "string",
  "password": "string"
}


##### Integrantes do grupo 28:

Frederico Azzarini Neutzling

Gustavo Correa Rodrigues

Gilberto de Souza Costa Filho

Gabriel Marcos Santos Ribeiro Florindo

Welber Pereira da Costa

Guilherme Ricardo Tavares Paula

