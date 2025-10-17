# Visão Geral

O sistema é uma aplicação web de gerenciamento de usuários, construída com React, TypeScript, Material-UI (MUI) e Tailwind CSS, seguindo boas práticas de desenvolvimento moderno. O objetivo é permitir que usuários se registrem, façam login, acessem uma área protegida e visualizem informações básicas, garantindo segurança, responsividade e uma experiência de usuário amigável.

## Funcionalidades

1. Cadastro de Usuário
   * Formulário de registro com campos:
     * Nome
     * Email
     * Senha
   * Validação de preenchimento obrigatório.
   * Senha armazenada de forma segura usando hashing (bcrypt) no backend.
   * Normalização do email (lowercase + trim) para evitar duplicidade.
   * Feedback visual para erros e sucesso no cadastro.
2. Login
   * Formulário de autenticação com email e senha.
   * Ocultação/mostragem de senha com ícone (MUI Icons Visibility/VisibilityOff).
   * Feedback de erros como “Email ou senha inválido” ou “Erro no servidor”.
   * Spinner de carregamento (CircularProgress) durante a autenticação.
   * Redirecionamento automático para a área protegida (/system) se já houver usuário e token no localStorage.
   * Armazenamento seguro do token JWT e dados do usuário no localStorage.
   *
3. Área Protegida (System)
   * Página acessível apenas a usuários autenticados.
   * Redirecionamento automático para /login caso o usuário não esteja logado.
   * Exibição de informações básicas do sistema e componentes como <Header />.
4. Controle de Sessão
   * Uso de JWT (JSON Web Token) para autenticação.
   * Persistência do login no navegador via localStorage.
   * Possibilidade de implementar logout removendo token e usuário do localStorage.

## Arquitetura e Estrutura
1. Frontend
   * React + TypeScript: Tipagem forte para maior segurança e prevenção de erros.
   * React Router: Navegação entre páginas públicas (/login, /register) e privadas (/system).
   * Hooks:
      * useState para gerenciamento de estados (email, senha, loading, error).
      * useEffect para redirecionamento automático de usuários logados.
   * Componentização: Formulários e elementos reutilizáveis (ex.: <Header />).
   * MUI + Tailwind CSS: Combinação de componentes prontos (MUI) com utilitários de estilo rápido e responsivo (Tailwind).
2. Backend (suporte)
   * API RESTful (Node.js/Express) com endpoints para:
      * /register → criar usuário
      * /login → autenticar usuário
   * Uso de bcrypt para hash de senhas.
   * Uso de JWT para gerar tokens de sessão com expiração.
   * Validações de campos obrigatórios e prevenção de duplicidade de emails.
