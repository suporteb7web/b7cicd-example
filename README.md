# cicd-example

API REST de tarefas em **Express + TypeScript** usada como projeto base do curso **Fundamentos de CI/CD**.

---

## Rodando localmente

```bash
# 1. Clone o repositório
git clone <url-do-repo>
cd cicd-example

# 2. Instale as dependências
pnpm install

# 3. Copie o arquivo de variáveis de ambiente
cp .env.example .env

# 4. Suba em modo de desenvolvimento (com hot reload)
pnpm dev
```

A API ficará disponível em `http://localhost:3000`.

---

## Scripts disponíveis

| Comando             | O que faz                                      |
|---------------------|------------------------------------------------|
| `pnpm start`        | Compila e sobe a aplicação                     |
| `pnpm dev`          | Sobe em modo watch (sem precisar compilar)     |
| `pnpm build`        | Compila o TypeScript para a pasta `dist/`      |
| `pnpm test`         | Roda os testes                                 |
| `pnpm lint`         | Verifica o código com ESLint                   |
| `pnpm typecheck`    | Verifica os tipos sem compilar (`tsc --noEmit`)|

---

## Endpoints

### `GET /tasks`
Retorna todas as tarefas.

**Response `200`**
```json
[
  { "id": 1, "title": "Estudar CI/CD", "done": false }
]
```

---

### `GET /tasks/:id`
Retorna uma tarefa pelo ID.

**Response `200`**
```json
{ "id": 1, "title": "Estudar CI/CD", "done": false }
```

**Response `404`**
```json
{ "error": "Task not found" }
```

---

### `POST /tasks`
Cria uma nova tarefa.

**Body**
```json
{ "title": "Configurar pipeline" }
```

**Response `201`**
```json
{ "id": 2, "title": "Configurar pipeline", "done": false }
```

**Response `400`** (título ausente ou vazio)
```json
{ "error": "Title is required" }
```

---

### `PUT /tasks/:id`
Atualiza o título e/ou o status de uma tarefa.

**Body** (todos os campos são opcionais)
```json
{ "title": "Novo título", "done": true }
```

**Response `200`**
```json
{ "id": 2, "title": "Novo título", "done": true }
```

---

### `DELETE /tasks/:id`
Remove uma tarefa.

**Response `204`** — sem corpo

**Response `404`**
```json
{ "error": "Task not found" }
```

---

## Stack

- **Node.js** + **TypeScript**
- **Express** — framework HTTP
- **pnpm** — gerenciador de pacotes
- **Jest** + **Supertest** — testes
- **ESLint** — lint do código

## Pré-requisitos

| Ferramenta | Versão mínima |
|---|---|
| Node.js | 20.x |
| pnpm | 11.x |

## Estrutura do projeto

```
cicd-example/
├── src/            # código-fonte da API
├── tests/          # testes automatizados
├── dist/           # saída da compilação (gerada)
├── COMANDOS.md     # cheatsheet de comandos
└── package.json
```

## Contribuindo

1. Crie uma branch a partir da `develop`:
   ```bash
   git switch -c feature/minha-feature
   ```
2. Faça as alterações e rode os testes (`pnpm test`) e o lint (`pnpm lint`).
3. Envie a branch e abra um Pull Request para a `develop`.

## teste