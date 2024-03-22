# Estoque Locadora


## Endpoints

- Filmes
    - [Listar Todos](#listar-todos)
    - [Detalhar](#detalhar-filme)
    - [Cadastrar](#cadastrar-filme)
    - [Apagar](#apagar-filme)
    - [Editar](#editar-filme)



### Listar Todos
`GET` /filme

Retorna um array com todas os filmes cadastrados.

**Exemplo de resposta:**

```js
[
    {
        "id": 1,
        "nome": "Vingadores",
        "valor": 50,
        "descricao": "Ação"
    }
]
```

**Códigos de Status**

| código | descrição | 
|--------|-----------|
|200|Dados retornados com sucesso

---

### Detalhar Filme

`GET` /Filme/{id}

Retorna os dados do Filme com o `id` informado.

**Exemplo de resposta:**

```js
    {
        "id": 1,
        "nome": "Vingadores",
        "valor": 50,
        "descricao": "Ação"
    }
```
**Códigos de Status**

| código | descrição | 
|--------|-----------|
|200|Dados retornados com sucesso
|404| Id do filme não encontrado

---

### Cadastrar Filme
`POST` /filme

Insere um novo filme.

**Corpo da Requisição:**

|campo|tipo|obrigatório|descrição 
|-----|----|:-----------:|-----------|
|nome|string| ✅ |Um nome para a Filme
|nome|float| ✅ |UM valor para o Filme
|descricao|string|❌|Descrição obrigatória

```js

{
        "nome": "Vingadores",
        "valor": 50,
        "descricao": "Ação"
}

```

**Exemplo de resposta:**

```js

{
        "id": 1,
        "nome": "Vingadores",
        "valor": 50,
        "descricao": "Ação"
}

```

**Códigos de Status**

| código | descrição | 
|--------|-----------|
|201|Filme criado com sucesso
|400|Erro de validação - verifique o corpo da requisição

---

### Apagar Filme

`DELETE` /filme/{id}

Apaga os dados do filme com o `id` informado.



**Códigos de Status**

| código | descrição | 
|--------|-----------|
|204|Filme apagado com sucesso
|404| Id da categoria não encontrado

---
### Editar Categoria

`PUT` /filme/{id}

Atualiza os dados do filme com o `id` informado.

|campo|tipo|obrigatório|descrição 
|-----|----|:-----------:|-----------|
|nome|string| ✅ |Um nome para a Filme
|nome|float| ✅ |UM valor para o Filme
|descricao|string|✅|Descrição para o filme

**Corpo da Requisição:**
```js

{
        "nome": "Vingadores",
        "valor": 100,
        "descricao": "Romance"
}

```

**Exemplo de resposta:**

```js

{
        "id": 1,
        "nome": "Vingadores",
        "valor": 100,
        "descricao": "Romance"
}

```

**Códigos de Status**

| código | descrição | 
|--------|-----------|
|200|Filme atualizado com sucesso
|400| A validação falhou - verifiue o corpo da requisição
|404| Id do filme não encontrado
