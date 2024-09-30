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

    const produto = await Produto.findByPk(id);
    if (!produto) {
        return res.status(404).end();
    }
    let {Novonome, Novodescricao, Novopreco, Novocategoria, NovoimagemUrl} = req.body;
    if(Novonome!=produto.nome && Novonome!=null){
        produto.nome = Novonome;
    }else{
        Novonome = produto.nome;
    }
    if(Novodescricao!=produto.descricao && Novodescricao!=null){
        produto.descricao = Novodescricao;
    }else{
        Novodescricao = produto.descricao;
    }
    if(Novopreco!=produto.preco && Novopreco!=null){
        produto.preco = Novopreco;
    }else{
        Novopreco = produto.preco;
    }
    if(Novocategoria!=produto.categoria && Novocategoria!=null){
        produto.categoria = Novocategoria;
    }else{
        Novocategoria = produto.categoria;
    }
    if(NovoimagemUrl!=produto.imagemUrl && NovoimagemUrl!=null){
        produto.imagemUrl = NovoimagemUrl;
    }else{
        NovoimagemUrl = produto.imagemUrl;
    }
    produto.update({Novonome, Novodescricao, Novopreco, Novocategoria, NovoimagemUrl});
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