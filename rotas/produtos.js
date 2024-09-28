import { Router } from "express";

import { Produto } from "../modelosBD/tabelasBd.js";

const rota_produtos = Router();

rota_produtos
    .get('/produtos', async (req, res) => {
    const produtos = await Produto.findAll();
    res.json(produtos);
    })
    .post('/produtos', async (req, res) => {
    const produto = await Produto.create(req.body);
    res.json(produto);
    })
    .get('/produtos/:id', async (req, res) => {
    const { id } = req.params;
    const produto = await Produto.findByPk(id);
    return produto ? res.json(produto) : res.status(404).end();
    })
    .put('/produtos/:id', async (req, res) => {
    const { id } = req.params;
    const produto = await Produto.findByPk(id);
    if (!produto) {
        return res.status(404).end();
    }
    produto.update(req.body);
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