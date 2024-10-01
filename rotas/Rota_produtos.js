import e, { Router } from "express";

import { Produto } from "../modelosBD/tabelasBd.js";
import {v4 as uuidv4} from 'uuid';

const rota_produtos = Router();

rota_produtos
    .get('/produtos', async (req, res) => {
    const produtos = await Produto.findAll();
    res.json(produtos);
    })
    .post('/produtos', async (req, res) => {
    const nome = req.body.nome;
    const nome_banco = await Produto.findOne({where: {nome: nome}});
    if(nome_banco){
        console.log('Produto já cadastrado');
        return res.status(409).end();
    }
    const produto = await Produto.create(req.body);
    res.json(produto);
    })
    .get('/produtos/:id', async (req, res) => {
    const { id } = req.params;
    const produto = await Produto.findByPk(id);
    produto ? res.json(produto) : res.status(404).end();
    return produto
    })
    .put('/produtos/:id', async (req, res) => {
    const { id } = req.params;
    console.log('id:', id);
    const produto = await Produto.findByPk(id);

    if (produto == null) {
        console.log("produto não encontrado");
        return res.status(404).end();
    }

    const corpo = req.body;
    if(corpo.nome){
        produto.nome = corpo.nome;
    }
    if(corpo.descricao){
        produto.descricao = corpo.descricao;
    }
    if(corpo.preco){
        produto.preco = corpo.preco;
    }
    if(corpo.categoria){
        produto.categoria = corpo.categoria;
    }
    if(corpo.imagemUrl){
        produto.imagemUrl = corpo.imagemUrl;
    }
    await produto.save();
    
        res.json(produto);
    })
    
    .delete('/produtos/:id', async (req, res) => {
    const { id } = req.params;
    const produto = await Produto.findByPk(id);
    if (!produto) {
        return res.status(404).end();
    }
    produto.destroy();
    res.json(produto);
    });

export default rota_produtos;