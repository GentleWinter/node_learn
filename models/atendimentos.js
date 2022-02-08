const { conexao } = require("../infra/tabelas");

class Atendimentos {
    adiciona(atendimentos){
        const sql = `INSERT INTO atendimentos SET ?`;

        conexao.query(sql, atendimentos, (erro, resultados) => {
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