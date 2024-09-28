import { Router } from "express";
import { Telefone } from "../modelosBD/tabelasBd.js";

const rota_telefones = Router();

rota_telefones
    .get('/telefones', async (req, res) => {
    const telefones = await Telefone.findAll();
    res.json(telefones);
    })
    .post('/telefones', async (req, res) => {
    const telefone = await Telefone.create(req.body);
    res.json(telefone);
    })
    .get('/telefones/:id', async (req, res) => {
    const { id } = req.params.id;
    const telefone = await Telefone.findByPk(id);
    return telefone ? res.json(telefone) : res.status(404).end();
    })
    .put('/telefones/:id', async (req, res) => {
        const { id } = req.params.id;
        const telefone = await Telefone.findByPk(id)
    if (!telefone) {
        return res.status(404).end();
    }
    telefone.update(req.body);
    res.json(telefone);
    })
    .delete('/telefones/:id', async (req, res) => {
    const { id } = req.params.id;
    const telefone = await Telefone.findByPk(id);
    if (!telefone) {
        return res.status(404).end();
    }
    telefone.destroy();
    res.json(telefone);
    })

export default rota_telefones;