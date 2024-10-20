import { Router } from "express";
import { itensCarrinho, Produto } from "../modelosBD/tabelasBd.js";
import { where } from "sequelize";
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
            const id_produto= parseInt(req.body.id_produto);
            const id_usuario = parseInt(req.body.id_usuario);
            const quantidade = parseInt(req.body.quantidade);
            const preco = parseFloat(req.body.preco);

            const item = await itensCarrinho.create({id_produto, id_usuario, quantidade, preco});
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

        console.log(req.body.id_produto + " :" + req.body.id_usuario);
        const {id_produto, id_usuario} = req.body;
        const item = await itensCarrinho.findOne({where:{id_produto:id_produto, id_usuario:id_usuario}})
        if(item){
            await item.destroy();
            res.json({success: true});
        }else{
            res.json({success: false});
        }

    })

export default rota_itensCarrinho;