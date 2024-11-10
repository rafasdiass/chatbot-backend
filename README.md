

---

# Chatbot Backend com NestJS

**Autor**: Rafael Dias

Este projeto implementa o backend para um chatbot utilizando NestJS, com autenticação de usuários via Firebase, sistema de pagamentos dinâmicos usando a API Stripe e envio de mensagens com Twilio. Ele também armazena o histórico de conversas e transações em um banco de dados SQLite, mantendo uma arquitetura modular e seguindo práticas de Clean Code para assegurar escalabilidade e facilidade de manutenção.

## Índice

- [Visão Geral](#visão-geral)
- [Arquitetura do Projeto](#arquitetura-do-projeto)
- [Estrutura de Diretórios](#estrutura-de-diretórios)
- [Instalação e Configuração](#instalação-e-configuração)
- [Configuração do Banco de Dados](#configuração-do-banco-de-dados)
- [Configuração das APIs](#configuração-das-apis)
- [Comandos para Executar o Projeto](#comandos-para-executar-o-projeto)
- [Detalhamento dos Módulos](#detalhamento-dos-módulos)
- [Licença](#licença)

## Visão Geral

Este backend foi desenvolvido com NestJS e fornece funcionalidades de:

- Autenticação de usuários através do Firebase.
- Processamento de pagamentos com a API Stripe.
- Gerenciamento de mensagens de chatbot via Twilio.
- Armazenamento de histórico de mensagens e pagamentos usando SQLite.

## Arquitetura do Projeto

A arquitetura do projeto é modular, garantindo que cada parte do sistema tenha uma única responsabilidade e que os componentes sejam altamente coesos e fracamente acoplados. Cada funcionalidade central é isolada em módulos específicos, permitindo que o código seja organizado e escalável.

### Principais Tecnologias e Bibliotecas:

- **NestJS**: Estrutura principal para o backend.
- **Firebase Admin SDK**: Usado para autenticação de usuários.
- **Stripe API**: Usado para processar pagamentos.
- **Twilio**: Usado para comunicação via SMS.
- **SQLite**: Banco de dados para persistência local de dados.
- **TypeORM**: ORM para mapear e gerenciar as entidades no SQLite.

## Estrutura de Diretórios

Abaixo, a estrutura de diretórios completa para melhor compreensão do projeto:

```
chatbot-backend/
├── src/
│   ├── app.module.ts                    # Módulo principal do aplicativo
│   ├── modules/                          # Diretório que contém os módulos principais
│   │   ├── firebase-auth/                # Módulo de autenticação
│   │   │   ├── firebase-auth.module.ts   # Define o módulo de autenticação
│   │   │   ├── firebase-auth.service.ts  # Serviço para autenticação Firebase
│   │   │   └── interfaces/               # Interfaces e tipos para o módulo de autenticação
│   │   ├── payments/                     # Módulo de pagamentos
│   │   │   ├── payments.module.ts        # Define o módulo de pagamentos
│   │   │   ├── payments.service.ts       # Serviço para integração com a API Stripe
│   │   │   ├── payment.entity.ts         # Entidade para armazenar registros de pagamentos no banco de dados
│   │   │   └── interfaces/               # Interfaces e tipos para o módulo de pagamentos
│   │   └── chat/                         # Módulo de chat
│   │       ├── chat.module.ts            # Define o módulo de chat
│   │       ├── chat.service.ts           # Serviço para enviar e receber mensagens via Twilio
│   │       ├── chat-message.entity.ts    # Entidade para salvar mensagens no banco de dados
│   │       └── interfaces/               # Interfaces e tipos para o módulo de chat
│   └── database/                         # Configurações do banco de dados
│       ├── database.module.ts            # Define o módulo de banco de dados
│       └── database.providers.ts         # Provedores de banco de dados para configuração do SQLite
├── .env.example                          # Exemplo de variáveis de ambiente
├── README.md                             # Documentação do projeto
├── tsconfig.json                         # Configurações do TypeScript
└── package.json                          # Dependências do projeto
```

## Instalação e Configuração

### Pré-requisitos

Para rodar este projeto, certifique-se de ter as seguintes ferramentas instaladas:

- **Node.js** (versão 14 ou superior)
- **NestJS CLI** para facilitar a inicialização do projeto
- Contas configuradas no Firebase, Stripe e Twilio

### Passos para Instalação

1. **Clone o repositório**:
   Abra o terminal e digite o comando abaixo para clonar o repositório:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd chatbot-backend
   ```

2. **Instale as dependências do projeto**:
   Execute o comando a seguir para instalar as dependências:
   ```bash
   npm install
   ```

3. **Instale pacotes adicionais**:
   Estes pacotes são necessários para o funcionamento do SQLite, Stripe, Firebase e Twilio:
   ```bash
   npm install @nestjs/typeorm typeorm sqlite3 @nestjs/jwt firebase-admin stripe twilio
   ```

## Configuração do Banco de Dados

Este projeto utiliza SQLite como banco de dados. Todas as entidades para armazenar dados de histórico de pagamentos e conversas são configuradas com TypeORM.

- O banco de dados será criado automaticamente ao rodar o projeto pela primeira vez.
- A configuração do banco de dados encontra-se no módulo principal `AppModule`, que importa `TypeOrmModule` com as entidades `Payment` e `ChatMessage`.

## Configuração das APIs

Para configurar as integrações com Firebase, Stripe e Twilio, você deve criar um arquivo `.env` na raiz do projeto com as seguintes variáveis de ambiente:

```plaintext
FIREBASE_PROJECT_ID=seu-firebase-project-id
STRIPE_SECRET_KEY=sua-stripe-secret-key
TWILIO_ACCOUNT_SID=seu-twilio-account-sid
TWILIO_AUTH_TOKEN=seu-twilio-auth-token
```

> **Nota**: Atualize os valores das variáveis com suas credenciais pessoais para cada serviço.

## Comandos para Executar o Projeto

### Executar em Ambiente de Desenvolvimento

Para iniciar o servidor em modo de desenvolvimento, utilize o comando:

```bash
npm run start:dev
```

Este comando habilita o hot-reload, o que permite que o servidor seja reiniciado automaticamente ao fazer alterações no código.

### Rodar o Projeto em Produção

Para rodar o servidor em modo de produção:

1. Compile o projeto:
   ```bash
   npm run build
   ```

2. Inicie o servidor com o comando:
   ```bash
   npm run start:prod
   ```

## Detalhamento dos Módulos

### 1. Módulo de Autenticação com Firebase (`FirebaseAuthModule`)

- **Responsabilidade**: Realizar autenticação de usuários utilizando tokens JWT do Firebase.
- **Componentes**: Um serviço que valida tokens enviados pelos clientes, usando o SDK do Firebase Admin.

### 2. Módulo de Pagamentos com Stripe (`PaymentsModule`)

- **Responsabilidade**: Gerenciar transações financeiras usando a API Stripe.
- **Componentes**: 
  - Serviço de criação de pagamento que se conecta à API Stripe para processar pagamentos.
  - Entidade `Payment` que registra cada transação, armazenando dados como `userId`, `amount`, `currency`, `status` e `date`.

### 3. Módulo de Chat com Twilio (`ChatModule`)

- **Responsabilidade**: Gerenciar mensagens enviadas e recebidas pelo chatbot.
- **Componentes**:
  - Serviço que envia e recebe mensagens de texto via Twilio.
  - Entidade `ChatMessage` que salva o histórico de mensagens trocadas, armazenando informações como `userId`, `message`, `sender` e `date`.

## Licença

Este projeto é licenciado por Rafael de souza dias

---

