import { Router } from "express";
import { Carrinho } from "../modelosBD/tabelasBd.js";
import { Produto } from "../modelosBD/tabelasBd.js";
import { Usuario } from "../modelosBD/tabelasBd.js";
import { itensCarrinho } from "../modelosBD/tabelasBd.js";
import { where } from "sequelize";

const rota_carrinho = Router();

rota_carrinho
    .get('/carrinhoUsuario', async (req,res) =>{
        const carrinho = await Carrinho.findOne({where:{id_usuario: req.body.id_usuario}});
        res.json(carrinho);
    })
    .post('/produtosCarrinho', async (req,res) =>{

        
        const carrinho = await Carrinho.findOne({where: {id_usuario: req.body.id_usuario}});
        
        console.log(carrinho.id_produto);
        res.json(carrinho);
    })

    .delete('/deletaProduto', async (req,res) =>{
        const item = await Carrinho.findByPk(req.body.id_produto, req.body.id_usuario);
        if(item){
            item.destroy();
            res.json(item);
        }else{
            res.json({error: "Item não encontrado"});
        }
    })



export default rota_carrinho;