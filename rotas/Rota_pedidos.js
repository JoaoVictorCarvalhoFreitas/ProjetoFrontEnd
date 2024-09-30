import { Router } from "express";
import { Pedido } from "../modelosBD/tabelasBd.js";

const rota_pedidos = Router();

rota_pedidos
    .get('/pedidos', async (req, res) => {
    const pedidos = await Pedido.findAll();
    res.json(pedidos);
    })
    .post('/pedidos', async (req, res) => {

    const pedido = await Pedido.create(req.body);
    res.json(pedido);
    })
    .get('/pedidos/:id', async (req, res) => {
    const { id } = req.params.id;
    const pedido = await Pedido.findByPk(id);
    return pedido ? res.json(pedido) : res.status(404).end();
    })
    .put('/pedidos/:id', async (req, res) => {
    const { id } = req.params.id;
    const pedido = await Pedido.findByPk(id)
    if (!pedido) {
        return res.status(404).end();
    }
    pedido.update(req.body);
    res.json(pedido);
    })
    .delete('/pedidos/:id', async (req, res) => {
    const { id } = req.params.id;
    const pedido = await Pedido.findByPk(id);
    if (!pedido) {
        return res.status(404).end();
    }
    pedido.destroy();
    res.json(pedido);
    });

    export default rota_pedidos;