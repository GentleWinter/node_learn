const moment = require(`moment`);
const { conexao } = require("../infra/tabelas");

class Atendimentos {
    adiciona(atendimentos){
        const dataCriacao = moment().format(`YYYY-MM-DD HH:MM:ss`);
        const data = moment(atendimentos.data, `DD/MM/YYY`).format(`YYYY-MM-DD HH:MM:ss`);
        const atendimentoDatado = {...atendimentos, dataCriacao, data}
        const sql = `INSERT INTO atendimentos SET ?`;

        conexao.query(sql, atendimentoDatado, (erro, resultados) => {
            if(erro){
                console.log(erro);
            }
            else{
                console.log(resultados);
            }

        });
    }
}

module.exports = new Atendimentos;