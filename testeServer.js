import express from 'express';
import ssequelize from './modelosBD/bdDeclaracao.js'
import { Produto, Usuario, Pedido, Telefone, ItemPedido } from './modelosBD/tabelasBd.js';

import path from 'path';

import rota_produtos from './rotas/produtos.js';
import rota_usuarios from './rotas/usuarios.js';





const app = express();
app.use(express.json());
app.use(rota_produtos);
app.use(rota_usuarios);


const port = 3000;

const sequelize = ssequelize



sequelize.authenticate()
   .then(()=>{
    console.log("conexao com o banco estabelecida")
   })
   .catch(err=>{
    console.log(err)
   })



app.use(express.static(path.join('paginas')));



  app.get('/pedidos', async (req, res) => {
    const pedidos = await Pedido.findAll();
    res.json(pedidos);
  });
  
  app.post('/pedidos', async (req, res) => {
    const pedido = await Pedido.create(req.body);
    res.json(pedido);
  });
  
  app.get('/telefones', async (req, res) => {
    const telefones = await Telefone.findAll();
    res.json(telefones);
  });
  
  app.post('/telefones', async (req, res) => {
    const telefone = await Telefone.create(req.body);
    res.json(telefone);
  });
  
  app.get('/itens_pedido', async (req, res) => {
    const itens = await ItemPedido.findAll();
    res.json(itens);
  });
  
  app.post('/itens_pedido', async (req, res) => {
    const item = await ItemPedido.create(req.body);
    res.json(item);
  });
  
  sequelize.sync().then(() => {
    app.listen(3000, () => {
      console.log('Servidor rodando na porta 3000');
    });
  });