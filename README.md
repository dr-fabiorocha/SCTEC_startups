# Plataforma de Conexão entre Startups e Entusiastas

#teste

Este projeto de implementação é parte dos requisitos para o processo de seleção para a trilha de IA para DEVs do edital SCTEC.



## Apresentação

O objetivo desta proposta é desenvolver uma plataforma que permite que startups divulguem seus projetos e que entusiastas encontrem oportunidades de investimento, participação ou mesmo acompanhem as startups em suas áreas de interesse.



O funcionamento da aplicação ocorre da seguinte forma:

Os proprietários de startups podem cadastrar suas startups na plataforma, classificando-as em um ou mais segmentos de atuação. Eles podem, a qualquer momento, editar ou remover as informações cadastradas. Além disso, podem informar  o seu objetivo: divulgação, busca de parceiros ou sócios.




Cada startup cadastrada possui as seguintes informações:

- Nome da startup
- Nome do responsável
- Município sede da startup
- Segmento de atuação
 	* tecnologia;
  	* fintech;
  	* saúde;
  	* comércio; 
  	* serviços;
  	* agro;
  	* educação.
- E-mail do responsável
- Status da startup
- Link para o pitch da startup
- Página web da startup
- Objetivo da presença na plataforma
 	* divulgação;
   	* busca de investimento ;
 	* busca de sócios;
 	* busca de funcionários.

O segundo tipo de usuário é o **entusiasta**. O entusiasta é uma pessoa interessada em acompanhar startups que atuam em determinados segmentos. Ele utiliza o sistema para informar suas áreas de interesse e, a partir disso, recebe como resposta uma lista de startups que atuam nesses setores. Ao selecionar uma startup da lista, o usuário passa a ter acesso às informações completas da empresa. O entusiasta também pode manifestar o seu apoio a uma startup, deixando uma *curtida* ou mesmo seu desagrado com uma *reprovação*. Essas informações são contabilizadas e isso vira um indicador da startup que é mostrado toda a vez que alguem acessa informações desta.

---

## Descrição da solução

O sistema consiste em uma **aplicação web que disponibiliza uma API REST**. Essa API poderá ser consumida tanto por um *frontend*  executado no navegador  quanto por **aplicações móveis**.

O primeiro passo para utilizar o sistema é realizar o **cadastro de um usuário**, criando assim suas credenciais de acesso. Após efetuar o login, o usuário escolhe qual papel deseja desempenhar no sistema: **proprietário de startup** ou **entusiasta**.

Dependendo do papel selecionado, diferentes funcionalidades são disponibilizadas:

- **Proprietário de startup:** pode cadastrar, editar ou remover os dados de sua startup.
- **Entusiasta:** pode selecionar os segmentos de interesse para visualizar e filtrar e avaliar startups relacionadas.

O usuário pode alterar seu papel a qualquer momento durante a utilização do sistema. Todas as informações cadastradas são armazenadas de forma persistente em um banco de dados.

---

## Estrutura Geral

O sistema é dividido em duas partes principais:

- *Backend:* executado em uma máquina servidora
- *Frontend:* executado no navegador do usuário ou em uma aplicação móvel

A aplicação web do *backend:*  é executada na porta **5000** e disponibiliza uma **API REST**, que é consumida pelo *frontend* por meio de requisições HTTP, como **GET** e **POST**, realizadas via `fetch`.

Para simplificar a arquitetura do sistema, o servidor *backend:*  também é responsável por **servir os arquivos da aplicação *frontend*  **. Dessa forma, ao acessar o endereço da máquina servidora na porta correta, o usuário recebe automaticamente a aplicação *frontend*  no navegador.

---

## Tecnologias utilizadas

No *backend:* , a aplicação web é desenvolvida utilizando  [NodeJS](https://nodejs.org/en) com persistência de dados realizada por meio do   [MongoDB](https://www.mongodb.com/) , utilizando a biblioteca  [Mongoose](https://mongoosejs.com/) como camada de modelagem de dados.

A API REST é implementada utilizando o framework [Express](https://expressjs.com), amplamente utilizado no ecossistema NodeJS.

Para simplificar o desenvolvimento inicial da aplicação, o mecanismo de autenticação não será implementado nesta fase. No entanto, ele pode ser facilmente incorporado futuramente utilizando por exemplo **tokens JWT (JSON Web Tokens)**.

Ao acessar a URL `http://localhost:5000`, o servidor Express retorna os arquivos da aplicação *frontend* , que são então renderizados pelo navegador do cliente.

O *frontend*  é desenvolvido utilizando **JavaScript**, o que permite utilizar a mesma linguagem tanto no *backend:*  quanto no *frontend* , reduzindo a complexidade tecnológica do projeto e possibilitando o reaproveitamento de partes do código.

Para facilitar a construção da interface e a organização dos componentes, é utilizado o framework  [Vue](https://vuejs.org)

Foram utilizadas ferramentas de visualização/edição de dados compatíveis com o MongoDB   [MongoDB Compass](https://www.mongodb.com/products/tools/compass) e   [Studio 3T](https://studio3t.com/)

~~~
project
│
├─ index.js
├─ package.json
│
├─ models
│   └─ Startup.js
│
├─ routes
│   └─ api.js
│
└─ public
    └─ frontend (Vue)
~~~

## API Rest startups

| Método     | Endpoint                          | Descrição                                                                                    | Entrada                                         | Retorno                                                                      |
| ---------- | --------------------------------- | -------------------------------------------------------------------------------------------- | ----------------------------------------------- | ---------------------------------------------------------------------------- |
| **POST**   | `/REST/startup/buscaPorSegmentos` | Obtém a listagem completa de startups que pertencem a **um ou mais segmentos de interesse**. | JSON no corpo contendo a lista de segmentos.    | JSON com vetor de startups.                                                  |
| **GET**    | `/REST/startup`                   | Obtém a listagem de **todas as startups**.                                                   | —                                               | JSON com vetor de startups contendo apenas **nome, responsável e segmento**. |
| **GET**    | `/REST/startup/:nome`             | Obtém as **informações completas** de uma startup específica.                                | Nome da startup na URL.                         | JSON com todos os dados da startup.                                          |
| **POST**   | `/REST/startup`                   | Cria uma **nova startup**.                                                                   | JSON no corpo com os dados da startup.          | JSON com os dados criados ou `null` se falhar.                               |
| **PUT**    | `/REST/startup/:nome`             | Atualiza uma startup existente com base no **nome**.                                         | Nome na URL + JSON com os novos dados no corpo. | JSON com os dados atualizados ou `null` se falhar.                           |
| **DELETE** | `/REST/startup/:nome`             | Remove uma startup com base no **nome**.                                                     | Nome da startup na URL.                         | String `"sucesso"` ou `"falha"`.                                             |

---

## Instruções para execução

Dentro da pasta do servidor existe uma subpasta chamada **`/public`**, que contém os arquivos da aplicação frontend.

O servidor de banco de dados precisa ser configurado (porta e nome do banco de dados). Essas configurações são inseridas num arquivo **.env** na pasta raiz do projeto. Ex:

~~~
# Arquivo com as configuracoes

# No exemplo abaixo o servidor mongo está rodando numa porta diferente da porta padrão (27017) pois ele está rodando num container docker e a porta foi mapeada para a porta 4000. Adapte a configuração para a sua instalação.
  
PROJ_PORT=5000
PROJ_MONGO_SERVER=mongodb://localhost:4000/
PROJ_DB=STARTUPS

~~~

Para iniciar o servidor, deve-se executar o seguinte comando:

### Acessando a Aplicação
~~~bash
node index.js
~~~

Neste momento o servidor em nodeJS roda na porta 5000. No browser do cliente deve-se utilizar http://localhost:5000 (caso esteja na mesma máquina) ou http://hostname:5000 em máquina diferente. Como  a aplicação *frontend* esta sendo servida diretamente pelo Express, o problema de acesso a recursos no servidor pelo browser  - CORS ( (Cross-Origin Resource Sharing)  não ocorre. 

A API REST pode ser testanda utilizando ferramentas como o Postman que permite escolher o verbo (GET, POST, DELETE, PUT), inserir a URL
## Pitch do Projeto
