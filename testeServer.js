import express from 'express';
import ssequelize from './modelosBD/bdDeclaracao.js'
import { Produto, Usuario, Pedido, Telefone, ItemPedido, Carrinho } from './modelosBD/tabelasBd.js';

import path from 'path';

import rota_produtos from './rotas/Rota_produtos.js';
import rota_usuarios from './rotas/Rota_usuarios.js';
import rota_pedidos from './rotas/Rota_pedidos.js';
import rota_telefones from './rotas/Rota_telefone.js';
import rota_itensPedidos from './rotas/Rota_itensPedidos.js';
import rota_carrinho from './rotas/Rota_Carrinho.js';
import rota_itensCarrinho from './rotas/Rota_itensCarrinho.js';



const sequelize = ssequelize

const port = 3000;

const app = express();
app.use(express.json())
app.use(express.static(path.join('paginas')));


app.use(rota_produtos, rota_usuarios, rota_pedidos, rota_telefones, rota_itensPedidos,rota_carrinho,rota_itensCarrinho);
  
sequelize.authenticate()
   .then(()=>{
    console.log("conexao com o banco estabelecida")
   })
   .catch(err=>{
    console.log(err)
})

  
sequelize.sync().then(() => {
    app.listen(3000, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
});