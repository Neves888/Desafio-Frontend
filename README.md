# Projeto Notícias e Localização

Este projeto consiste em duas funcionalidades principais: Um CRUD de Notícias e uma Busca de CEP. Foram implementadas separadamente, um CRUD de Notícias  que usa o json-server para simular um back-end e o React para a interface de front-end, e uma de busca de CEP também feita em react.

## Estrutura do Projeto

O projeto é dividido em duas pastas principais:

**Busca de CEP: Responsável por implementar a busca de CEP.**

  *Estrtuturado da seguinte maneira:*

```
teste-frontend-busca-cep/
├── public/                  # Arquivos estáticos (HTML, imagens, etc.)
├── src/                     # Código-fonte da aplicação
│   ├── components/          # Componentes React
│   │   ├── buscaCep.css     # Estilos do componente BuscaCEP
│   │   ├── buscaCep.tsx     # Componente principal de busca de CEP
│   │   └── buscaCep.test.tsx# Testes do componente BuscaCEP
│   ├── App.css              # Estilos globais da aplicação
│   ├── App.tsx              # Componente principal da aplicação
│   ├── index.css            # Estilos gerais
│   ├── index.tsx            # Ponto de entrada da aplicação
│   ├── reportWebVitals.ts   # Relatório de desempenho
│   └── setupTests.ts        # Configuração dos testes
├── .gitignore               # Arquivos ignorados pelo Git
├── Dockerfile               # Configuração do Docker para o front-end
├── jest.config.js           # Configuração do Jest para testes
├── package.json             # Dependências e scripts do projeto
└── tsconfig.json            # Configuração do TypeScript
```
**Justificativa:**

- public/: Contém arquivos estáticos que não precisam de processamento, como o index.html.

- src/: Segue a convenção do React para organizar o código-fonte.

- components/: Componentes reutilizáveis e específicos da funcionalidade de busca de CEP.

- App.tsx: Componente raiz da aplicação.

- index.tsx: Ponto de entrada da aplicação.

- Testes: Os testes estão próximos dos componentes que testam, seguindo a prática de colocar testes junto ao código.

- Configurações: Arquivos como Dockerfile, jest.config.js, e tsconfig.json estão na raiz para facilitar o acesso e a manutenção.
 ____

**CRUD de Notícias: Contém a implementação de um sistema CRUD para manipulação de notícias.**

  *Estrtuturado da seguinte maneira:*

```
noticias-crud/
├── frontend/                # Aplicação front-end
│   ├── public/              # Arquivos estáticos
│   ├── src/                 # Código-fonte do front-end
│   │   ├── components/      # Componentes React
│   │   │   └── Noticias.js  # Componente de listagem/manipulação de notícias
│   │   ├── services/        # Serviços de API
│   │   │   └── api.js       # Configuração das chamadas à API
│   │   ├── App.js           # Componente principal do front-end
│   │   ├── index.css        # Estilos globais
│   │   ├── index.js         # Ponto de entrada do front-end
│   │   └── reportWebVitals.js# Relatório de desempenho
│   ├── .gitignore           # Arquivos ignorados pelo Git
│   ├── Dockerfile           # Configuração do Docker para o front-end
│   └── package.json         # Dependências e scripts do front-end
├── backend/                 # Aplicação back-end
│   ├── public/              # Arquivos estáticos (se necessário)
│   ├── style/               # Estilos (se necessário)
│   ├── .gitignore           # Arquivos ignorados pelo Git
│   ├── db.json              # Banco de dados simulado (JSON)
│   ├── Dockerfile           # Configuração do Docker para o back-end
│   ├── package.json         # Dependências e scripts do back-end
│   └── server.js            # Ponto de entrada do back-end
└── docker-compose.yml       # Configuração do Docker Compose para rodar front-end e back-end juntos
```
**Justificativa:**

- Separação clara entre front-end e back-end:

- frontend/: Contém toda a lógica de interface do usuário.

- components/: Componentes reutilizáveis, como o componente de notícias.

- services/: Lógica de chamadas à API, seguindo boas práticas de separação de responsabilidades.

- backend/: Contém a lógica do servidor e o banco de dados simulado.

- db.json: Banco de dados em JSON, útil para desenvolvimento e testes.

- server.js: Ponto de entrada do back-end, responsável por lidar com as requisições HTTP.

- docker-compose.yml: Facilita a execução do front-end e back-end juntos, garantindo que ambos os serviços se comuniquem corretamente.

     


## Como Rodar o Projeto

**1. Clone o repositório;**

**2. Abra o projeto e vá ate pasta até a pasta noticias-crud para a funcionalidade de CRUD de noticias ou vá até a pasta teste-frontend-busca-cep para ver a funcionalidade de buscador de CEP;**

**3. Navegue até a pasta de sua preferência**

```bash
cd /caminho/para/noticias-crud
```
ou 

```bash
cd /caminho/para/teste-frontend-busca-cep
```

**4. Instale as dependências do projeto com o comando**
```npm install```;

## Executando a Aplicação Noticias

**Rodando o projeto sem o Docker**

    1º. Suba o back-end com o comando: npm start;
    2º. Vá até a pasta front-end e no arquivo api.js substitua o endereço da url por localhost:5000;
    3º. Suba o front-end também utilizando o comando npm start.
*Obs: verifique que você está dentro das respectivas pastas, o caminho deve ser algo como:

```bash
cd /caminho/para/noticias-crud/backend
``` 

**Rodando o projeto em Docker**

    No terminal geral do projeto após instalar as depências digite o comando:

 ```docker-compose up --build```;

*- Após subir os containers, a API estará disponível na URL* ```http://localhost:3000/noticias```;

*- Parar os containers basta usar o comando**```docker-compose down```. 

**- Parar rodar os testes use o comando** ```npm run test```. 

## Executando a Aplicação Busca de CEP

### Rodando o projeto sem o Docker ###

    Após instalar as dependências use o comando: npm start

### Rodando o projeto com o Docker ###

Este guia explica como configurar e rodar a aplicação **teste-frontend-busca-cep** usando o Docker.

---

## Requisitos
Certifique-se de ter os seguintes itens instalados na sua máquina:

- **Docker** (https://docs.docker.com/get-docker/)
- **Docker Compose** (opcional, dependendo da necessidade de compor múltiplos serviços)

---

## Passos para Configurar e Rodar a Aplicação

### 1. Navegue até o Diretório do Projeto
Abra o terminal e vá até o diretório onde está o arquivo `Dockerfile`.

```bash
cd /caminho/para/teste-frontend-busca-cep
```

---

### 2. Criar a Imagem Docker
Use o comando abaixo para construir a imagem Docker da aplicação:

```bash
docker build -t teste-frontend-busca-cep .
```
- **`-t teste-frontend-busca-cep`**: Define o nome da imagem como `teste-frontend-busca-cep`.
- **`.`**: Refere-se ao diretório atual, onde está o `Dockerfile`.

Se o processo for bem-sucedido, a imagem será criada com base nas instruções do Dockerfile.

---

### 3. Executar o Contêiner
Após criar a imagem, execute o seguinte comando para iniciar o contêiner:

```bash
docker run -d -p 3000:80 teste-frontend-busca-cep
```
- **`-d`**: Executa o contêiner em segundo plano.
- **`-p 3000:80`**: Mapeia a porta 80 do contêiner (Nginx) para a porta 3000 da sua máquina local.
- **`teste-frontend-busca-cep`**: Nome da imagem criada no passo anterior.

---

### 4. Acessar a Aplicação
Abra o navegador e acesse a aplicação na URL:

```
http://localhost:3000
```

A aplicação estará funcionando, servida pelo Nginx dentro do contêiner Docker.

---

## Comandos Úteis para Gerenciar o Docker

### Verificar Contêineres Ativos
Use este comando para listar todos os contêineres em execução:

```bash
docker ps
```

---

### Parar um Contêiner
Para parar um contêiner em execução, use o seguinte comando, substituindo `<container_id>` pelo ID do contêiner listado em `docker ps`:

```bash
docker stop <container_id>
```

---

### Remover um Contêiner
Após parar o contêiner, você pode removê-lo com:

```bash
docker rm <container_id>
```

---

### Remover Imagens Antigas
Para remover imagens que não estão mais sendo usadas:

```bash
docker rmi <image_id>
```

---

### Recriar o Contêiner (Se Necessário)
Se fizer alterações no código ou no `Dockerfile`, será necessário recriar a imagem e o contêiner:

```bash
docker build -t teste-frontend-busca-cep .
docker run -d -p 3000:80 teste-frontend-busca-cep
```

---

## Problemas Comuns

### Erro de Porta Já em Uso
Se a porta 3000 já estiver sendo usada, pare o serviço ou use outra porta ao rodar o contêiner:

```bash
docker run -d -p 3001:80 teste-frontend-busca-cep
```

Neste caso, acesse a aplicação em:

```
http://localhost:3001
```

### Verifique o Log do Contêiner
Se a aplicação não funcionar, veja os logs do contêiner para entender o problema:

```bash
docker logs <container_id>
```

---

