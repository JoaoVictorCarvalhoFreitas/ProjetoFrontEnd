import { Router } from "express";
import { itensCarrinho, Produto } from "../modelosBD/tabelasBd.js";
const rota_itensCarrinho = Router();

rota_itensCarrinho
    .get('/itensCarrinho/:id', async (req,res) =>{
        const itens = await itensCarrinho.findAll({where: {id_usuario: req.params.id} }) ;
        const produtos = await Promise.all(itens.map(async (item) => {
            // Buscar cada produto pelo id_produto
            const produto = await Produto.findByPk(item.id_produto);
            return { ...produto.dataValues, quantidade: item.quantidade }; // Incluir quantidade do item no resultado
        }));
        res.json(produtos);
    })
    .post('/adicionaCarrinho', async (req,res) =>{
        try{    
            console.log(req.body);
            const item = await itensCarrinho.create(req.body);
            res.json(item);
        }catch(error){
            res.send({error: error.message});
        }
    })
    .put('/atualizaQuantidade', async (req,res) =>{
        const item = await itensCarrinho.findByPk(req.body.id_produto);
        if(item){
            item.update(req.body);
            res.json(item);
        }else{
            res.json({error: "Item não encontrado"});
        }
    })
    .delete('/deletaItem', async (req,res) =>{

        const item = await itensCarrinho.findByPk(req.body.id_produto, req.body.id_usuario);
        item? item.destroy().then(res => res.json()): res.json({error: "Item não encontrado"});
    })

export default rota_itensCarrinho;