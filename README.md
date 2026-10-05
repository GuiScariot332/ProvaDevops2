Prova P2 - DevOps
Projeto da P2 da disciplina de DevOps. Tem uma API em NestJS, um front em React e um Postgres, tudo rodando com Docker Compose.
Pastas:
• api/ - API NestJS com CRUD de produtos
• front/ - front em React (Vite) que mostra os produtos numa tabela
• deploy/ - docker-compose.yml e o .env.example


Requisitos
• Docker e Docker Compose instalados
• Portas 5432, 3000 e 8080 livres

Como subir
Clone o repo e entre na pasta deploy:
git clone https://github.com/<usuario>/prova-devops-p2.git
cd prova-devops-p2/deploy
cp .env.example .env
docker compose up -d --build

Depois que terminar de buildar:
• front: http://localhost:8080
• swagger: http://localhost:3000/docs
• postgres: localhost:5432 (usuario e senha estao no .env)

Endpoints
Todos em /suppliers:
• GET /suppliers - lista todos
• GET /suppliers/:id - busca um pelo id
• POST /suppliers - cria
• PATCH /suppliers/:id - atualiza
• DELETE /suppliers/:id - apaga

Exemplo do retorno do GET:
[
  {
    "id": 1,
    "company_name": "Metalúrgica Silva LTDA",
    "cnpj": "12.345.678/0001-90",
    "contact_name": "João Silva",
    "contact_email": "joao@metalurgicasilva.com.br"
  }
]

Como derrubar
cd deploy
docker compose down -v
O -v apaga tambem o volume do postgres. Se quiser manter os dados pra subir de novo depois, roda sem o -v.