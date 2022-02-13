const res = require("express/lib/response");
const { conexao } = require("../infra/tabelas");
const Atendimentos = require(`../models/atendimentos`);

module.exports = app => {

    app.get('/atendimentos', (req, res) => {
        Atendimentos.lista(res);
    });

    app.get(`/atendimentos/:id`, (req, res)=>{
        const id = parseInt(req.params.id);
        Atendimentos.buscaId(id, res);
    });

    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body;

        Atendimentos.adiciona(atendimento, res);
    });

    app.patch(`/atendimentos/:id`, (req, res)=> {
        const id = parseInt(req.params.id);
        const valores = req.body;

        Atendimentos.altera(id, valores, res);
    });
}