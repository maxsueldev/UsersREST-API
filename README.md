# UsersREST-API

Aplicação web de gerenciamento de usuários desenvolvida com React e TypeScript, integrada a uma API REST própria. O projeto implementa fluxos de cadastro e autenticação, navegação entre páginas públicas e privadas e gerenciamento de estado.

Desenvolvido como projeto pessoal de estudo, com foco na prática de desenvolvimento Front-End, integração com APIs e construção de interfaces responsivas.

## Capturas de Tela

<img width="1365" height="767" alt="users-rest-api1" src="https://github.com/user-attachments/assets/49bd9d53-5e33-4905-8bc1-58fb6b614fd4" />

<img width="1361" height="765" alt="users-rest-api2" src="https://github.com/user-attachments/assets/42c9bfd7-186a-46ef-bae6-661fc3fc168b" />

<img width="1363" height="767" alt="users-rest-api3" src="https://github.com/user-attachments/assets/890a87a8-1184-4bef-8994-d52d8ce8b35c" />

## Demonstração

- **Aplicação online:** https://users-rest-api.vercel.app/
- **Repositório do Front-End:** https://github.com/maxsueldev/UsersREST-API
- **Repositório do Back-End:** https://github.com/maxsueldev/Backend-UsersREST-API

## Funcionalidades

- Cadastro de usuários com nome, e-mail e senha.
- Login com e-mail e senha.
- Integração com API REST própria.
- Autenticação baseada em JWT.
- Rotas públicas e proteção de páginas privadas.
- Persistência dos dados da sessão no `localStorage`.
- Logout e remoção dos dados locais da sessão.
- Validação de campos obrigatórios.
- Normalização de e-mail para evitar diferenças causadas por espaços e letras maiúsculas.
- Feedback visual para erros e operações de autenticação.
- Indicador de carregamento durante o login.
- Interface responsiva.

## Tecnologias utilizadas

- **React** — construção da interface.
- **TypeScript** — tipagem estática.
- **React Router DOM** — navegação e proteção de rotas.
- **Context API** — compartilhamento de estado.
- **Material UI (MUI)** — componentes de interface.
- **Tailwind CSS** — estilização responsiva.
- **React Icons** — ícones.

## Arquitetura

O projeto é dividido em duas aplicações independentes:

### Front-End

Responsável pela interface, validação dos formulários no cliente, navegação, gerenciamento do estado da sessão e comunicação com a API.

### Back-End

Uma API REST própria, desenvolvida separadamente, responsável pela autenticação e pelo processamento das requisições. O projeto utiliza MongoDB Atlas para persistência dos dados e está hospedado no Render.

- [Código-fonte do Back-End](https://github.com/maxsueldev/Backend-UsersREST-API)

## Executando o Front-End localmente

### Pré-requisitos

- Node.js e npm instalados.
- Acesso à API do projeto.

### Instalação

Clone o repositório:

```bash
git clone https://github.com/maxsueldev/UsersREST-API.git
```

Entre na pasta:

```bash
cd UsersREST-API
```

Instale as dependências:

```bash
npm install
```

Configure a variável de ambiente com a URL da API, conforme o arquivo `.env` utilizado pelo projeto.

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O Vite exibirá no terminal o endereço local para acessar a aplicação.

## Observações sobre autenticação

A aplicação utiliza JWT para autenticação e `localStorage` para persistir o token e os dados do usuário no navegador.

O `localStorage` não oferece proteção contra leitura do token por scripts executados na origem da aplicação. Por isso, esse mecanismo não deve ser considerado seguro contra ataques XSS por si só.

As senhas são tratadas pelo Back-End, que utiliza bcrypt para armazenar hashes em vez de senhas em texto puro.

## Aprendizados

Este projeto permitiu praticar:

- Desenvolvimento de interfaces com React e TypeScript.
- Criação e reutilização de componentes.
- Integração com uma API REST própria.
- Fluxos de autenticação e controle de sessão.
- Navegação e proteção de rotas.
- Gerenciamento de estado com Context API e Hooks.
- Organização de uma aplicação Front-End conectada a um Back-End independente.

---

Projeto pessoal desenvolvido para fins de estudo e aprimoramento técnico.
