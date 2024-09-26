import express from 'express';
import ssequelize from './modelosBD/bdDeclaracao.js'
import { Produto, Usuario, Pedido, Telefone, ItemPedido } from './modelosBD/tabelasBd.js';



const app = express();
app.use(express.json());


const port = 3000;

const sequelize = ssequelize



sequelize.authenticate()
   .then(()=>{
    console.log("conexao com o banco estabelecida")
   })
   .catch(err=>{
    console.log(err)
   })
app.post('/produto', async (req,res)=>{

    console.log(req.body)
    const {nome,preco} = req.body
    try{
        const produto = await Produto.create({
            nome:nome,
            preco:preco
        })
        res.send("produto cadastrado")
    }catch(error) {
        console.log(error)
        res.send("erro produto nao")
    }
    
})


app.use(express.static('paginas'));

// let produtos = [
//     { id: '1', nome: 'café expresso', preco: '9.99', imagemUrl: 'https://mundoemrevista.com.br/wp-content/uploads/2024/04/cafe-espresso-3-otimas-opcoes-de-maquinas-por-menos-de-r-500.webp' },
//     { id: '2', nome: 'capuccino', preco: '19.99', imagemUrl: 'https://img.freepik.com/fotos-gratis/deliciosa-xicara-de-cafe-de-qualidade_23-2150691369.jpg?w=740&t=st=1725488811~exp=1725489411~hmac=5d9f0d365ff2d452e6d291085f0e8353b728070c80e0d0ec29a598bb42e3a8a8' },
//     { id: '3', nome: 'Café com depressão', preco: '999.99', imagemUrl: 'https://s2-techtudo.glbimg.com/twoewJmwpMgtGPcRPP8SxFlDVmM=/0x0:695x393/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2021/P/f/y52r4ySZWLkJjEhKLhgw/2014-11-14-java-logo.jpg' }
// ];

// app.get('/api/produtos', (req, res) => {
//     console.log('GET /api/produtos');
//     res.json(produtos);
// });

// app.get('/api/produtos/:id', (req, res) => {
//     const produtos = produtos.find(p => p.id == req.params.id);
//     console.log(`GET /api/produtos/${req.params.id}`);
//     if (produtos) {
//         res.json(produtos);
//     } else {
//         console.error('Produto não encontrado:', req.params.id);
//         res.status(404).json({ message: 'Produto não encontrado' });
//     }
// });

// app.post('/api/produtos', (req, res) => {
//     const { id, nome, preco, imagemUrl } = req.body;
//     const existingProductIndex = produtos.findIndex(produtos => produtos.id == id);

//     console.log('POST /api/produtos', req.body);

//     if (existingProductIndex > -1) {
//         produtos[existingProductIndex] = { id, nome, preco, imagemUrl };
//     } else {
//         produtos.push({ id, nome, preco, imagemUrl });
//     }

//     res.status(200).json({ message: 'Produto salvo com sucesso!' });
// });

// app.delete('/api/produtos/:id', (req, res) => {
//     const { id } = req.params;
//     const productIndex = produtos.findIndex(p => p.id == id);

//     console.log(`DELETE /api/produtos/${id}`);

//     if (productIndex > -1) {
//         produtos.splice(productIndex, 1);
//         res.status(200).json({ message: 'Produto excluído com sucesso!' });
//     } else {
//         console.error('Produto não encontrado para exclusão:', id);
//         res.status(404).json({ message: 'Produto não encontrado' });
//     }
// });


// Produto 
app.get('/produtos', async (req, res) => {
    const produtos = await Produto.findAll();
    res.json(produtos);
  });
  

  // ok
app.post('/produtos', async (req, res) => {
    console.log(req.body)
    const produto = await Produto.create(req.body);
    res.status(201).send(req.body);
}); 
  
  // Usuario 
  app.get('/usuarios', async (req, res) => {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  });
  
  app.post('/usuarios', async (req, res) => {
    const usuario = await Usuario.create(req.body);
    res.json(usuario);
  });
  
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