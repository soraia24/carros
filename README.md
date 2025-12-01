# Api de Loja de Carros
Este projeto marca o início da nossa jornada no desenvolvimento Back-End.
Trata-se da nossa primeira API, criada para o gerenciamento de carros, com o objetivo de oferecer uma forma rápida e prática de conhecer informações essenciais sobre cada carro e também compra-los — ajudando o usuário a decidir qual carro comprar e comprando no conforto do seu lar.

A API armazena e disponibiliza dados como:

- Marca
- Modelo
- Ano
- preço
- chassi
- cor

# Tecnologias Utilizadas
- javaScript 
- Node.js
- Express
- bcrypt
- jsonwebtoken
- Mongo Atlas

# Endpoints Usuarios 

- POST	usuarios/login	Realiza o login e retorna um token JWT
- POST	usuarios/cadastrar	Cadastra novo usuário
- GET	usuarios	Lista todos os usuários 
- GET	usuarios/id	Lista usuários especifico
- PUT   usuarios/id Alterar Parcial  ou Total 

# Endpoints Filmes 

- POST	carros/cadastrar	Cadastra novo Filme
- GET	carros	Lista todos os Filmes 
- GET	carros/id	Lista Filmes especifico
- PUT   carros/id Alterar Parcial  ou Total 


## Funcionalidades e Permissões

###  Sem Login
- Pode **cadastrar um novo usuário comum**.
- Consulta todos os Carros.

---

### Usuário Comum
**Permissões:**
- Pesquisar **todos os Carros**.
- Pesquisar **Carros por ID**.
- Comprar Carros
- Consulta lista de Carros Comprados
- **Alterar** seu próprio cadastro.
- **Excluir** sua própria conta.

---

### Administrador (Admin)
**Permissões avançadas:**

#### Gerenciamento de Filmes
-  **Cadastrar** novos Carros.
-  **Alterar** informações dos Carros.
-  **Excluir** Carros.
-  **Pesquisar todos os Carros**.
-  **Pesquisar Carro por ID**.

#### Gerenciamento de Usuários
- **Cadastrar** usuários comuns e administradores.
- **Alterar** dados de qualquer usuário.
- **Excluir** qualquer usuário.
- **Pesquisar todos os usuários**.
- **Pesquisar usuário por ID**.


# Autor e contato
- Soraia Araujo
- Artur Gabriel
- github:
  - https://github.com/soraia24
  - https://github.com/Arturgr21


