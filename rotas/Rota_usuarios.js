import { Router } from "express";
import { Usuario } from "../modelosBD/tabelasBd.js";

const rota_usuarios = Router();
rota_usuarios  
    .get('/usuarios', async (req, res) => {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  })
    .post('/usuarios', async (req, res) => {
    const usuario = await Usuario.create(req.body);
    res.json(usuario);
  })
    .get(' usuarios/:id', async (req, res) => {
    const { id } = req.params.id;
    const usuario = await Usuario.findByPk(id);
    return usuario ? res.json(usuario) : res.status(404).end();
  })
    .put('/usuarios/:id', async (req, res) => {
    const { id } = req.params.id;
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
        return res.status(404).end();
    }
    usuario.update(req.body);
    res.json(usuario);
  })
    .delete('/usuarios/:id', async (req, res) => {
    const { id } = req.params.id;
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
        return res.status(404).end();
    }
    usuario.destroy();
    res.json(usuario);
  });

export default rota_usuarios;