const res = require("express/lib/response");

module.exports = app => {

    app.get('/atendimentos', (req, res) => res.send('voce esta na rota de atendimentos e realizando um GET'));

    app.post('/atendimentos', (req, res) => res.send(`voce esta na rota de atendimentos e realizando um POST`));
}