import { Router } from "express";
import { ItemPedido } from "../modelosBD/tabelasBd.js";

const rota_itensPedidos = Router();

rota_itensPedidos   
    .get('/itens_pedido', async (req, res) => {
    const itens = await ItemPedido.findAll();
    res.json(itens);
    })
    .post('/itens_pedido', async (req, res) => {
    const item = await ItemPedido.create(req.body);
    res.json(item);
    }
    )
    .get('/itens_pedido/:id', async (req, res) => {
    const { id } = req.params;
    const item = await ItemPedido.findByPk(id);
    return item ? res.json(item) : res.status(404).end();
    })
    .put('/itens_pedido/:id', async (req, res) => {
    const { id } = req.params;
    const item = await ItemPedido.findByPk(id)
    if (!item) {
        return res.status(404).end();
    }
    item.update(req.body);
    res.json(item);
    })
    .delete('/itens_pedido/:id', async (req, res) => {
    const { id } = req.params;
    const item = await ItemPedido.findByPk(id);
    if (!item) {
        return res.status(404).end();
    }
    item.destroy();
    res.json(item);
    });

export default rota_itensPedidos;