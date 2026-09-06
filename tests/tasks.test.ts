import request from 'supertest';
import app from '../src/app';
import { resetTasks } from '../src/taskController';
import { beforeEach, describe, it } from 'node:test';

beforeEach(() => {
  resetTasks();
});

describe('GET /tasks', () => {
  it('deve retornar uma lista vazia quando não há tarefas', async () => {
    const res = await request(app).get('/tasks');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  it('deve retornar as tarefas criadas', async () => {
    await request(app).post('/tasks').send({ title: 'Tarefa 1' });
    await request(app).post('/tasks').send({ title: 'Tarefa 2' });

    const res = await request(app).get('/tasks');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
  });
});

describe('POST /tasks', () => {
  it('deve criar uma tarefa com título válido', async () => {
    const res = await request(app).post('/tasks').send({ title: 'Estudar CI/CD' });
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ id: 1, title: 'Estudar CI/CD', done: false });
  });

  it('deve retornar 400 quando o título está ausente', async () => {
    const res = await request(app).post('/tasks').send({});
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});

describe('GET /tasks/:id', () => {
  it('deve retornar uma tarefa pelo id', async () => {
    await request(app).post('/tasks').send({ title: 'Configurar pipeline' });

    const res = await request(app).get('/tasks/1');
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ id: 1, title: 'Configurar pipeline' });
  });

  it('deve retornar 404 para id inexistente', async () => {
    const res = await request(app).get('/tasks/999');
    expect(res.status).toBe(404);
  });
});

describe('PUT /tasks/:id', () => {
  it('deve atualizar o título e o status de uma tarefa', async () => {
    await request(app).post('/tasks').send({ title: 'Tarefa antiga' });

    const res = await request(app)
      .put('/tasks/1')
      .send({ title: 'Tarefa atualizada', done: true });

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ id: 1, title: 'Tarefa atualizada', done: true });
  });

  it('deve retornar 404 ao tentar atualizar tarefa inexistente', async () => {
    const res = await request(app).put('/tasks/999').send({ title: 'Nada' });
    expect(res.status).toBe(404);
  });
});

describe('DELETE /tasks/:id', () => {
  it('deve remover uma tarefa existente', async () => {
    await request(app).post('/tasks').send({ title: 'Remover isso' });

    const del = await request(app).delete('/tasks/1');
    expect(del.status).toBe(204);

    const res = await request(app).get('/tasks');
    expect(res.body).toHaveLength(0);
  });

  it('deve retornar 404 ao tentar deletar tarefa inexistente', async () => {
    const res = await request(app).delete('/tasks/999');
    expect(res.status).toBe(404);
  });
});
function expect(status: number) {
  throw new Error('Function not implemented.');
}

