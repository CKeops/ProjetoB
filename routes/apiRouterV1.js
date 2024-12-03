var express = require('express');
var apiRouterV1 = express.Router();

var produtos = [
  { "id": 1, "descricao": "Camiseta", "marca": "Nike", "preco": 4.99 },
  { "id": 2, "descricao": "Tênis", "marca": "Adidas", "preco": 249.99 },
  { "id": 3, "descricao": "Calça Jeans", "marca": "Levi's", "preco": 199.99 },
  { "id": 4, "descricao": "Boné", "marca": "Puma", "preco": 79.90 },
  { "id": 5, "descricao": "Jaqueta", "marca": "The North Face", "preco": 599.99 },
  { "id": 6, "descricao": "Mochila", "marca": "Samsonite", "preco": 349.99 },
  { "id": 7, "descricao": "Óculos de Sol", "marca": "Ray-Ban", "preco": 599.90 },
  { "id": 8, "descricao": "Relógio", "marca": "Casio", "preco": 199.99 },
  { "id": 9, "descricao": "Chinelo", "marca": "Havaianas", "preco": 39.90 },
  { "id": 10, "descricao": "Meias", "marca": "Nike", "preco": 29.99 }
]

apiRouterV1.get('/produtos', function (req, res, next) {
  res.json(produtos)
});

apiRouterV1.get('/produtos/:id', function (req, res, next) {
  let idReq = req.params.id
  if (idReq) {
    idInt = Number.parseInt(idReq)
    let idx = produtos.findIndex(o => o.id === idInt)
    if (idx >= 0) {
      res.json(produtos[idx])
    }

    else {
      res.status(404).json({ message: `Produto não encontrado!` })
    }
  }
  else {
    res.status(404).json({ message: `Produto não encontrado!` })
  }

});

apiRouterV1.post('/produtos', function (req, res, next) {
  let produto = req.body
  let newId = Math.max(...produtos.map(o => o.id)) + 1
  produto.id = newId
  produtos.push(produto)
  res.status(201).json({ message: `Produto inserido com sucesso`, data: { id: newId } })

});

apiRouterV1.delete('/produtos/:id', function (req, res, next) {
  let idReq = req.params.id
  if (idReq) {
    idInt = Number.parseInt(idReq)
    let idx = produtos.findIndex(o => o.id === idInt)
    if (idx >= 0) {
      produtos.splice(idx, 1)
      res.status(200).json({ message: `Produto excluido com sucesso` })
    }

    else {
      res.status(404).json({ message: `Produto não encontrado!` })
    }
  }
  else {
    res.status(404).json({ message: `Produto não encontrado!` })
  }
})

apiRouterV1.put('/produtos/:id', function (req, res, next) {
  let idReq = req.params.id
  let produto = req.body
  if (idReq) {
    idInt = Number.parseInt(idReq)
    let idx = produtos.findIndex(o => o.id === idInt)
    if (idx >= 0) {
      produtos[idx].descricao = produto.descricao
      produtos[idx].marca = produto.marca
      produtos[idx].preco = produto.preco


      res.status(200).json({ message: `Produto alterado com sucesso`, data: { produto: produtos[idx] } })

    }

    else {
      res.status(404).json({ message: `Produto não encontrado!` })
    }
  }
  else {
    res.status(404).json({ message: `Produto não encontrado!` })
  }
})

module.exports = apiRouterV1;
