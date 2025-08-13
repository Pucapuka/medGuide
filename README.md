# 💊 MedGuide - Sistema de Gerenciamento de Medicamentos

## 📝 Descrição

O **MedGuide** é uma aplicação web desenvolvida para auxiliar no gerenciamento de informações sobre medicamentos, incluindo dados sobre uso, armazenamento, descarte e interações medicamentosas.  
Este sistema foi criado como projeto final de curso, alinhado com os Objetivos de Desenvolvimento Sustentável (ODS) da ONU, especialmente o **ODS 3 - Saúde e Bem-Estar**.

---

## ✨ Funcionalidades

- 🔍 **Busca de medicamentos por nome**
- 🏷️ **Filtragem por categorias**
- 📄 **Visualização detalhada de cada medicamento**
- 📱 **Design responsivo para mobile e desktop**
- 📊 **Gerenciamento completo de dados (CRUD)**

---

## 🛠️ Tecnologias Utilizadas

### Frontend

- [ReactJS](https://react.dev/)
- [Material-UI (MUI)](https://mui.com/)
- [Axios](https://axios-http.com/)
- [React Router](https://reactrouter.com/)

### Backend

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- **Sistema de armazenamento em JSON** (banco de dados em memória)

---

## 🚀 Como Executar o Projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) (v16 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

### Instalação

Clone o repositório:

```bash
git clone https://github.com/seu-usuario/medguide.git
cd medguide
```

Instale as dependências do backend:

```bash
cd backend
npm install
```

Instale as dependências do frontend:

```bash
cd ../frontend
npm install
```

### Execução

Inicie o servidor backend:

```bash
cd backend
npm start
```

Inicie o aplicativo frontend:

```bash
cd ../frontend
npm start
```

Acesse a aplicação no navegador:

```
http://localhost:3000
```

---

## 📂 Estrutura do Projeto

```
medGuide/
├── backend/
│   └── src/
│       ├── controllers/       # Lógica dos endpoints
│       ├── data/              # Dados de teste
│       ├── routes/            # Definição das rotas
│       ├── utils/             # Utilitários (store JSON)
│       ├── app.js             # Configuração do Express
│       └── server.js          # Ponto de entrada do servidor
├── frontend/
│   └── guia-medicamentos/
│       ├── public/            # Arquivos estáticos
│       └── src/
│           ├── assets/        # Imagens e ícones
│           ├── components/    # Componentes reutilizáveis
│           ├── pages/         # Páginas da aplicação
│           ├── services/      # Configuração da API
│           ├── App.jsx        # Componente principal
│           ├── index.css      # Folha de estilos principal
│           └── main.jsx       # Ponto de entrada
└── README.md
```

---

## 🌐 Endpoints da API

| Método | Endpoint                       | Descrição                                 |
|--------|------------------------------- |-------------------------------------------|
| GET    | `/medicamentos`                | Lista todos os medicamentos               |
| GET    | `/medicamentos/:id`            | Obtém um medicamento por ID               |
| POST   | `/medicamentos`                | Cadastra um novo medicamento              |
| PUT    | `/medicamentos/:id`            | Atualiza um medicamento existente         |
| DELETE | `/medicamentos/:id`            | Remove um medicamento                     |
| GET    | `/medicamentos/search?nome=`   | Busca medicamentos por nome               |
| GET    | `/categories`                  | Lista todas as categorias                 |
| GET    | `/categories/:categoria`       | Lista medicamentos por categoria          |
| GET    | `/interactions`                | Lista medicamentos com interações         |

> **Observação:** Nem todos os endpoints são utilizados no frontend, mas estão disponíveis para futuras ampliações.

---

## 📄 Licença

Este projeto está licenciado sob a licença MIT.  
Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## ✉️ Contato

**Paulo Anderson Lima**  
📧 solucoes.magic.ti@gmail.com  
🔗 [Projeto no GitHub](https://github.com/Pucapuka/medGuide)

---

Desenvolvido com ❤️ como parte do trabalho final do curso de Desenvolvimento FullStack da Recode.