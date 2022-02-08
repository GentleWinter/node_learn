const res = require("express/lib/response");
const Atendimentos = require(`../models/atendimentos`);

module.exports = app => {

    app.get('/atendimentos', (req, res) => res.send('GET atendimentos'));

    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body;

        Atendimentos.adiciona(atendimento);
        res.send(`POST atendimentos`);
    });
}