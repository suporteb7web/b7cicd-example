(ITEM EDITADO)

# b7cicd-example

API REST de tarefas em **Express + TypeScript** usada como projeto base do curso **Fundamentos de CI/CD**.

---

## Rodando localmente

```bash
# 1. Clone o repositório
git clone <url-do-repo>
cd b7cicd-example

# 2. Instale as dependências
npm install

# 3. Copie o arquivo de variáveis de ambiente
cp .env.example .env

# 4. Suba em modo de desenvolvimento (com hot reload)
npm run dev
```

A API ficará disponível em `http://localhost:3000`.

---

## Scripts disponíveis

| Comando             | O que faz                                      |
|---------------------|------------------------------------------------|
| `npm start`         | Compila e sobe a aplicação                     |
| `npm run dev`       | Sobe em modo watch (sem precisar compilar)     |
| `npm run build`     | Compila o TypeScript para a pasta `dist/`      |
| `npm test`          | Roda os testes                                 |
| `npm run lint`      | Verifica o código com ESLint                   |
| `npm run typecheck` | Verifica os tipos sem compilar (`tsc --noEmit`)|

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
